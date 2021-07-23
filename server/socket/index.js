
const { getAllConversations, createNewConversation, createGroupConversation, addMember, removeMember }= require('../controllers/conversationController');
const { getAllMessages, getPreMessages, userReadLastMessage, addMessage } = require('../controllers/messageController');

let initSocket = (io) => {

    let users = [];

    io.on('connection', socket => {
        console.log("socket connected: ", socket.id)
        socket.on('join', userId => {
            socket.join(userId);
            if(!users.find(user => user.userId === userId)) {
                users.push({userId, socketId : socket.id});
                io.emit('sendOnlineUsers', users)
            }
        });

        socket.on('disconnect', () => {
            users = users.filter((user) => user.socketId !== socket.id);
                io.emit('sendOnlineUsers', users);
              
        });

        socket.on('join-conversation', async(data) => {
            await socket.leave(data.oldConversation);
            socket.join(data.newConversation);  
        });

        socket.on('createNewConversation', async (formData) => {
            const data = await createNewConversation(formData);
            const recipients = formData.recipients;
            io.to(socket.id).emit('succeedInCreateNewConversation', data)
            recipients.forEach(person => {
                if(person !== data.message.sender) {
                    io.to(person).emit('message', data);
                }            
            })
        })

        socket.on('createGroupChat', async(formData) => {
            const data = await createGroupConversation(formData);
            io.to(socket.id).emit('succeedInCreateNewConversation', data)
            const recipients = formData.people;
            recipients.forEach(person => {
                if(person !== data.message.sender) {
                    io.to(person).emit('message', data);
                }            
            })
        });

        socket.on('getConversations', async (userId) => {
            const conversationList = await getAllConversations(userId);            
            io.to(socket.id).emit('sendConversations', conversationList);
        });

        socket.on('getMessages', async (conversationId) => {
            const messages = await getAllMessages(conversationId);
            io.to(socket.id).emit('sendMessages', messages)
        });

        socket.on('getPreMessages', async (infor) => {
            const { conversationId, time } = infor;
            const preMessages = await getPreMessages(conversationId, time);
            io.to(socket.id).emit('sendPreMessages', preMessages)
        });

        socket.on('sendMessage', async (formData) => {
            const data = await addMessage(formData);           
            const recipients = formData.recipients; 
            recipients.forEach(person => { 
                io.to(person).emit('message', data);
            })
        });
        
        socket.on('userReadLastMessage', async(data) => {
            const updatedMessage = await userReadLastMessage(data);
            io.to(data.conversationId).emit('updateUserReadMessage', { message: updatedMessage});
        });

        socket.on('addMember', async(data) => {
            const response = await addMember(data);
            io.to(data.conversationId).emit('SucceedInAddMember', response);
            io.to(data.userId).emit('updateConversationsAfterAdded', response)
        } );

        socket.on('removeMember', async(data) => {
            let response = await removeMember(data);
            response.removedId = data.userId;
            io.to(data.conversationId).emit('SucceedInRemoveMember', response);
            io.to(data.userId).emit('updateConversationsAfterRemoved', response)
             
        });

        socket.on('userIsTypingMessage', data => {
            io.to(data.conversationId).emit('getUserIsTypingMessage', { user : data.user});
        });

        socket.on('userStopTypingMessage', data => {
            io.to(data.conversationId).emit('getUserStopTypingMessage', { userId : data.userId});
        })
    })
}

module.exports = initSocket;