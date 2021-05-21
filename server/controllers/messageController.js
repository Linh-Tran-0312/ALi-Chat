const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const MessageController = {};

MessageController.getAllMessagesByConversationId = async (req, res) => {
    const conversationId = req.params.id;
    
    try {
        const messages = await Message.aggregate([
            {
                $match: { conversation: new mongoose.Types.ObjectId(conversationId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "senderInfo",
                }
            },
            {
                $sort: { "createdAt": 1 }
            }
        ]);
      
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!' });
    }

};
MessageController.getAllMessages =  async (conversationId) => {
    try {
        const messages = await Message.aggregate([
            {
                $match: { conversation: new mongoose.Types.ObjectId(conversationId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "senderInfo",
                }
            },
            {
                $sort: { "createdAt": -1 }
            },
            {
                $limit: 10
            },
            {
                $sort: {"createdAt": 1}
            }
        ]);
      
        return messages
    } catch (error) {
        console.log(error)
    }
}
MessageController.getPreMessages = async(conversationId, time) => {

    try {
        const preMessages = await Message.aggregate([{
           $match: {$and : [{conversation : new mongoose.Types.ObjectId(conversationId)}, {  createdAt: { $lt : time }}]}
        },
        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "senderInfo",
            }
        },
        {
            $sort : { "createdAt": -1 }
        },
        {
            $limit: 10
        },
        {
            $sort: { "createdAt" : 1}
        }
    ])
    return preMessages;
    } catch (error) {
        console.log(error)
    }
}
MessageController.createMessage = async(req,res) => {

    const { conversation, sender, recipients, attachment, text} = req.body
    let conversationId = conversation;
   
    try {
        if(!conversation) {
            let newConversation = {
                people: [...recipients]
            };

            newConversation = await Conversation.create({...newConversation});
            conversationId = newConversation._id;
        
        }
        const newMessage = await Message.create({conversation : conversationId, sender, recipients, attachment, text});
        let currentConversation = await Conversation.findById(conversationId);
        if(newMessage.attachment) {
          
            currentConversation.attachments.push(newMessage.attachment);
        } 
        currentConversation.lastMessage = newMessage._id;
        currentConversation = await Conversation.findByIdAndUpdate(conversationId,{...currentConversation}, { new: true})
        return res.status(200).json({message : newMessage, conversation : currentConversation })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!'});
    }
}
MessageController.addMessage = async(message) => {
       try {
            const newMessage =  await Message.create({...message})
           const currentConversation = await Conversation.findById(message.conversation);
           currentConversation.lastMessage = newMessage._id;
        
           if(message.attachment) {
               currentConversation.attachments.push(message.attachment);
           }
        
            await Conversation.findByIdAndUpdate(currentConversation._id, {...currentConversation}, { new : true });
        
           return newMessage

       } catch (error) {
           console.log(error)
       }
}
module.exports = MessageController;