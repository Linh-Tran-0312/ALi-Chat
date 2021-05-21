const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const ConversationController = {};

ConversationController.createNewConversation = async(formData) => {
    const { recipients, attachment, text, sender } = formData;
    try {
        let newConversation = await Conversation.create({ people: recipients});
        const message = await Message.create({ conversation: newConversation._id, recipients, sender, text, attachment})
        
        if(attachment) {
            newConversation.attachments.push(attachment)
        }
        newConversation.lastMessage = message._id
        await Conversation.findByIdAndUpdate(newConversation._id, {...newConversation });
    
        const conversation = await Conversation.aggregate([
            { $match: { _id:  newConversation._id}},
            {
                $lookup :
                {
                   from : "users",
                   localField: "people",
                   foreignField: "_id",
                   as : "peopleInfo",
                }
            },
            {
                $lookup : 
                {
                    from : "messages",
                    localField: "lastMessage",
                    foreignField: "_id",
                    as : "lastMessageInfo",
                }
            },
            {
                $sort : { "lastMessageInfo.createdAt" : -1}
            }       
           ]);
           console.log(conversation)
        return {conversation: conversation[0], message}
    
    } catch (error) {
        console.log(error)
    }
}
ConversationController.getConversationListByUserId =  async (req, res) => {
 try {
     /* const conversations = await Conversation.find({ people: { $all : [req.userId]}}); */
     // find all conversations contain userId and sort by createdAt of last_message by descending
     const conversations = await Conversation.aggregate([
         { $match: { people: { $in: [req.user._id]}}},
         {
             $lookup :
             {
                from : "users",
                localField: "people",
                foreignField: "_id",
                as : "peopleInfo",
             }
         },
         {
             $lookup : 
             {
                 from : "messages",
                 localField: "lastMessage",
                 foreignField: "_id",
                 as : "lastMessageInfo",
             }
         },
         {
             $sort : { "lastMessageInfo.createdAt" : -1}
         }       
        ]);
      
     return res.status(200).json(conversations)
 } catch (error) {
     return res.status(500).json({ message: 'Something went wrong!'})
 }
};
ConversationController.getAllConversations = async(userId) => {
    try {
        /* const conversations = await Conversation.find({ people: { $all : [req.userId]}}); */
        // find all conversations contain userId and sort by createdAt of last_message by descending
        const conversations = await Conversation.aggregate([
            { $match: { people: { $in: [new mongoose.Types.ObjectId(userId)]}}},
            {
                $lookup :
                {
                   from : "users",
                   localField: "people",
                   foreignField: "_id",
                   as : "peopleInfo",
                }
            },
            {
                $lookup : 
                {
                    from : "messages",
                    localField: "lastMessage",
                    foreignField: "_id",
                    as : "lastMessageInfo",
                }
            },
            {
                $sort : { "lastMessageInfo.createdAt" : -1}
            }       
           ]);

        return conversations
    } catch (error) {
        console.log(error)
    }
}
ConversationController.getConversationById = async (req, res) => {

    const id = req.params.id;
    try {
        const conversation = await Conversation.aggregate([
            {
                $match : { _id : id}
            },
            {
                $lookup : {
                    from: 'User',
                    localField: 'people',
                    foreignField: '_id',
                    as: "peopleInfo"
                }
            }
        ]);

        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!'});
    }
}

ConversationController.updateConversation = async(req,res) => {
    const { id, last_message, attachments, people  } = req.body;
    try {
        const conversation = await Conversation.findById(id);
        const updatedConversation = await Conversation.findByIdAndUpdate(id, {...conversation, lastMessage: last_message,  attachments, people}, { new : true});
        return res.status(200).json(updatedConversation);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!'});
    }

}



module.exports = ConversationController