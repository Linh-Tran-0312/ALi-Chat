require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');
const profileRouter = require('./routes/profile.js');
const chatRouter = require('./routes/chats.js');
const passport = require('passport');
const socketIo = require('socket.io');
const addMessage = require('./controllers/messageController').addMessage;
const { getAllConversations, createNewConversation }= require('./controllers/conversationController');
const { getAllMessages, getPreMessages, userReadLastMessage } = require('./controllers/messageController');
const { createGroupConversation, addMember, removeMember } = require('./controllers/conversationController');


const app = express();

const server = http.createServer(app);
/* const io = socketIo(server); */
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require('./middleware/passport.js');
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
    res.send("This is the Ali Chat API created by Linh Tran")
})

app.use('/users', userRouter);
app.use('/chats', passport.authenticate('jwt', { session: false }), chatRouter)
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);




mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log("Server is listening on port: " + PORT)))
    .then(() => {
        let users = [];
        io.on('connection', socket => {
      
            socket.on('join', userId => {
                socket.join(userId);
                if(!users.find(user => user.userId === userId)) {
                    users.push({userId, socketId : socket.id});
                    io.emit('sendOnlineUsers', users)
                }
            })
             socket.on('disconnect', () => {
                users = users.filter((user) => user.socketId !== socket.id);
                    io.emit('sendOnlineUsers', users);
                  
             })
            socket.on('join-conversation', async(data) => {
                await socket.leave(data.oldConversation);
                socket.join(data.newConversation);  
            });
            socket.on('createNewConversation', async (formData) => {
                const data = await createNewConversation(formData);
               // io.to(socket.id).emit('message', data);
                const recipients = formData.recipients;
                recipients.forEach(person => {
                    //if (person !== formData.sender) {
                        io.to(person).emit('message', data);
                    //}
                })
            })
            socket.on('createGroupChat', async(formData) => {
                const data = await createGroupConversation(formData);
                io.to(socket.id).emit('message', data);
                const recipients = formData.people;
                recipients.forEach(person => {
                    if (person !== formData.host) {
                        io.to(person).emit('message', data);
                    }
                })
            })
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
            } )
            socket.on('sendMessage', async (formData) => {
                const newMessage = await addMessage(formData);
                const data = { message: newMessage, conversation: ''}
              //  io.to(formData.conversation).emit('message', data);
                const recipients = formData.recipients; 
                recipients.forEach(person => { 
                   // if (person !== formData.sender) {
                        io.to(person).emit('message', data);
                    //}
                })
            });
            
            socket.on('userReadLastMessage', async(data) => {
                await userReadLastMessage(data);
                io.to(data.conversationId).emit('updateUserReadMessage', { conversationId : data.conversationId});
            })

            socket.on('addMember', async(data) => {
                const response = await addMember(data);
                io.to(data.conversationId).emit('SucceedInAddMember', response);
                const newMemberId = data.people[data.people.length - 1];
                io.to(newMemberId).emit('loadConversationsAgain')
            } );

            socket.on('removeMember', async(data) => {
                let response = await removeMember(data);
                response.removedId = data.userId;
                io.to(data.conversationId).emit('SucceedInRemoveMember', response);
                 
            });
 




        })
    })
    .catch(error => console.log(error));
mongoose.set('useFindAndModify', false);
