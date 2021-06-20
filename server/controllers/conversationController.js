const mongoose = require('mongoose');
const os = require('os');
const fs = require('fs');
const path = require('path');
const cloudinary = require("../utils/cloudinary");
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const { fileURLToPath } = require('url');

const ConversationController = {};

ConversationController.createNewConversation = async (formData) => {
    const { recipients, attachment, text, sender, isReadBy } = formData;
    if(text) {
        try {
            let newConversation = await Conversation.create({ people: recipients });
            const message = await Message.create({ conversation: newConversation._id, isFirst: true,recipients, sender, text, attachment, isReadBy })

            newConversation.lastMessage = message._id
            await Conversation.findByIdAndUpdate(newConversation._id, { ...newConversation });
    
            const conversation = await Conversation.aggregate([
                { $match: { _id: newConversation._id } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "people",
                        foreignField: "_id",
                        as: "peopleInfo",
                    }
                },
                {
                    $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as: "lastMessageInfo",
                    }
                },
                {
                    $sort: { "lastMessageInfo.createdAt": -1 }
                }
            ]);
            console.log(conversation)
            return { conversation: conversation[0], message }
    
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            console.log(typeof os.tmpdir());
            const finalPath = path.join(os.tmpdir(), attachment.name);                  
            fs.writeFileSync(finalPath, attachment.body);
            const result = await cloudinary.uploader.upload(finalPath); 
            const url = result.url;
            
            let newConversation = await Conversation.create({ people: recipients });
            const message = await Message.create({ conversation: newConversation._id, isFirst: true,recipients, isReadBy, sender, text, attachment : url })
           
            newConversation.lastMessage = message._id
            newConversation.attachments.push(url);
            await Conversation.findByIdAndUpdate(newConversation._id, { ...newConversation });
    
            const conversation = await Conversation.aggregate([
                { $match: { _id: newConversation._id } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "people",
                        foreignField: "_id",
                        as: "peopleInfo",
                    }
                },
                {
                    $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as: "lastMessageInfo",
                    }
                },
                {
                    $sort: { "lastMessageInfo.createdAt": -1 }
                }
            ]);
            
            return { conversation: conversation[0], message }
    
        } catch (error) {
            console.log(error)
        }
    }
  
}
ConversationController.createGroupConversation = async (formData) => {
    const { people, host, name } = formData;
    try {
        let newConversation = await Conversation.create({ people, host, name });
        const newMessage = await Message.create({ conversation: newConversation._id, isFirst : true, isReadBy: [host] , sender: host, recipients: people });
        newConversation.lastMessage = newMessage._id;
        await Conversation.findByIdAndUpdate(newConversation._id, {...newConversation});
        newConversation = await Conversation.aggregate([
            {
             $match: { _id: newConversation._id }
            },
            {
            $lookup :
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as : "lastMessageInfo",
                    }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
           },
    
         ]);
    const data = {
        conversation: newConversation[0],
        message: newMessage
    }
    console.log(data.conversation);
    return data
} catch (error) {
    console.log(error)
}
}
ConversationController.getConversationListByUserId = async (req, res) => {
    const userId = req.params.id
    try {
        const conversations = await Conversation.aggregate([
            { $match: { people: { $in: [new mongoose.Types.ObjectId(userId)] } } },
            {
                $lookup:
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                {
                    from: "messages",
                    let: {"lastMessageId" : "$lastMessage"},
                    pipeline : [
                        { $match: { $expr : { $eq : ["$_id", "$$lastMessageId"]}}},
                        {
                            $lookup: 
                            {
                                from: 'users',
                                let: {"senderId" : "$sender"},
                                pipeline : [
                                    { $match : { $expr : { $eq: ["$_id", "$$senderId"]}}}
                                ],
                                as: "senderInfo"
                            }
                        }

                    ],
                    as: "lastMessageInfo",
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
            },
            {
                $sort: { "lastMessageInfo.createdAt": -1 }
            }
        ]);
        
        return res.status(200).json(conversations)
    } catch (error) {
        console.log(error)
    }
};
ConversationController.getAllConversations = async (userId) => {
    try {
        const conversations = await Conversation.aggregate([
            { $match: { people: { $in: [new mongoose.Types.ObjectId(userId)] } } },
            {
                $lookup:
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                {
                    from: "messages",
                    let: {"lastMessageId" : "$lastMessage"},
                    pipeline : [
                        { $match: { $expr : { $eq : ["$_id", "$$lastMessageId"]}}},
                        {
                            $lookup: 
                            {
                                from: 'users',
                                let: {"senderId" : "$sender"},
                                pipeline : [
                                    { $match : { $expr : { $eq: ["$_id", "$$senderId"]}}}
                                ],
                                as: "senderInfo"
                            }
                        }

                    ],
                    as: "lastMessageInfo",
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
            },
            {
                $sort: { "lastMessageInfo.createdAt": -1 }
            }
        ]);
        
        return conversations;
    } catch (error) {
        console.log(error)
    }
}
ConversationController.getConversationById = async (req, res) => {

    const id = req.params.id;
    try {
        const conversation = await Conversation.aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'people',
                    foreignField: '_id',
                    as: "peopleInfo"
                }
            }
        ]);

        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!' });
    }
}

ConversationController.updateConversation = async (req, res) => {
    const { _id, people} = req.body;
    console.log(people)
    try {
      
        await Conversation.findByIdAndUpdate(_id, { people }, { new: true });
        const updatedConversation = await Conversation.aggregate([
            {
             $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
            $lookup :
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as : "lastMessageInfo",
                    }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
           },
    
         ]);
       
        return res.status(200).json(updatedConversation[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!' });
    }

}

ConversationController.addMember = async(data) => {
    const { conversationId, people, userId }  = data;
     
    try {
        let updatedConversation = await Conversation.findByIdAndUpdate(conversationId, { people });
         updatedConversation = await Conversation.aggregate([
            {
             $match: { _id: new mongoose.Types.ObjectId(conversationId) }
            },
            {
            $lookup :
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as : "lastMessageInfo",
                    }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
           },
    
         ]);
         const newUser = await User.findById(userId);
         const newUserName = newUser.firstname;
         const notifyMessage = await Message.create({ conversation: conversationId, isNotify: true, text: `${newUserName} has joined this group.` })

        return {conversation: updatedConversation[0], message: notifyMessage};
    } catch (error) {
        console.log({ message: 'Something went wrong!' });
    }
}
ConversationController.removeMember = async(data) => {
    const { conversationId, people, userId, isRemoved }  = data;
     
    try {
        let updatedConversation = await Conversation.findByIdAndUpdate(conversationId, { people });
         updatedConversation = await Conversation.aggregate([
            {
             $match: { _id: new mongoose.Types.ObjectId(conversationId) }
            },
            {
            $lookup :
                {
                    from: "users",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleInfo",
                }
            },
            {
                $lookup:
                    {
                        from: "messages",
                        localField: "lastMessage",
                        foreignField: "_id",
                        as : "lastMessageInfo",
                    }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "host",
                    foreignField: "_id",
                    as: "hostInfo",
                }
           },
    
         ]);
         const removedUser = await User.findById(userId);

         const removedUserName = removedUser.firstname;
         let notifyMessage;
         if(isRemoved) {
            notifyMessage = await Message.create({ conversation: conversationId, isNotify: true, text: `${removedUserName} has been removed from this group.` })

         } else {
            notifyMessage = await Message.create({ conversation: conversationId, isNotify: true, text: `${removedUserName} has left this group.` })

         }

        return {conversation: updatedConversation[0], message: notifyMessage};
    } catch (error) {
        console.log({ message: 'Something went wrong!' });
    }
}

 

module.exports = ConversationController