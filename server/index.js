require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const chatRouter = require('./routes/chats.js');
const passport = require('passport');
const socketIo = require('socket.io');
const initSocket = require('./socket');


const app = express();

const server = http.createServer(app);
 
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.urlencoded({ extended: false, limit: '30mb' }));
app.use(express.json({ limit: '30mb'}));

app.use(cors({ origin: process.env.CLIENT_URL}))
app.use(passport.initialize());
require('./middleware/passport.js');
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
    res.send("This is the Ali Chat API created by Linh Tran")
})

app.use('/auth', authRouter);
app.use('/chats', passport.authenticate('jwt', { session: false }), chatRouter)
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);



mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log("Server is listening on port: " + PORT)))
    .then(() => { initSocket(io)})
    .catch(error => console.log(error));
mongoose.set('useFindAndModify', false);
