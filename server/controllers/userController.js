const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Conversation = require('../models/Conversation');
 

const UserController = {};

UserController.signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User don't exist. Please try again !" });
        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) return res.status(400).json({ message: 'Password is not correct. Please try again !' });

        const payload = { email: existingUser.email, id: existingUser._id };
        const result = { _id: existingUser._id, caption: existingUser.caption, email: existingUser.email, username: existingUser.username, avatar: existingUser.avatar, lastname: existingUser.lastname, firstname: existingUser.firstname };
        const token = jwt.sign(payload, 'secret', { expiresIn: '30d' });

        return res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }

};

UserController.signUp = async (req, res) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    try {

        const existingUser = await User.findOne({ email });


        if (existingUser) return res.status(400).json({ message: "This email is already signed up. Please try another email." });

        if (password !== confirm_password) return res.status(400).json({ message: "Password don't match." });

        const hashPassword = await bcrypt.hashSync(password, 10);

        const user = await User.create({ lastname, firstname, email, password: hashPassword });

        // add new user to Ali Community Group
       await Conversation.findByIdAndUpdate("60fc2fea5d5bad06144e28dc", { $push: { people: user._id}});

        const result = { _id: user._id, email: user.email, avatar: user.avatar, lastname: user.lastname, firstname: user.firstname };
        const payload = { email: user.email, id: user._id };

        const token = jwt.sign(payload, 'secret', { expiresIn: '30d' });


        return res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

UserController.signInWithGoogle = async (req, res) => {
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({ idToken: req.body.tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        let user = await User.findOne({ googleId });

        if (!user) {
            user = await User.create({
                firstname: payload['given_name'],
                lastname: payload['family_name'],
                avatar: payload['picture'],
                googleId
            });
            await Conversation.findByIdAndUpdate("60fc2fea5d5bad06144e28dc", { $push: { people: user._id}});
        }
        const payloadToken = { email: user.email, id: user._id };
        const result = { _id: user._id, caption: user.caption, email: user.email, avatar: user.avatar, lastname: user.lastname, firstname: user.firstname };
        const token = jwt.sign(payloadToken, 'secret', { expiresIn: '30d' });

        return res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later!' });
    }
};

UserController.signInWithFacebook = async (req, res) => {
    try {
        const userToken = req.body.accessToken;

        appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + process.env.FACEBOOK_CLIENT_ID + '&client_secret=' + process.env.FACEBOOK_CLIENT_SECRET + '&grant_type=client_credentials'
        const https = require('https');

        https.get(appLink, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                data = JSON.parse(data);

                const appToken = data.access_token;
                const link = 'https://graph.facebook.com/debug_token?input_token=' + userToken + '&access_token=' + appToken;

                https.get(link, (resp) => {
                    let verifyInfo = '';
                    resp.on('data', (chunk) => {
                        verifyInfo += chunk;
                    });
                    resp.on('end', async () => {
                        verifyInfo = JSON.parse(verifyInfo).data;

                        if (verifyInfo.app_id === process.env.FACEBOOK_CLIENT_ID) {
                            let user = await User.findOne({ facebookId: verifyInfo.user_id });

                            if (!user) {
                                const profileLink = "https://graph.facebook.com/" + verifyInfo.user_id + "?fields=last_name,first_name,picture,email&access_token=" + userToken;
                                https.get(profileLink, (resp) => {
                                    let profile = '';
                                    resp.on('data', (chunk) => {
                                        profile += chunk;
                                    });
                                    resp.on('end', async () => {
                                        profile = JSON.parse(profile);
                                        console.log(profile);
                                        user = await User.create({
                                            firstname: profile.first_name,
                                            lastname: profile.last_name,
                                            avatar: profile.picture.data.url,
                                            facebookId: verifyInfo.user_id
                                        });
                                        await Conversation.findByIdAndUpdate("60fc2fea5d5bad06144e28dc", { $push: { people: user._id}});
                                        const payloadToken = { id: user._id };
                                        const result = { _id: user._id, email: user.email, avatar: user.avatar, lastname: user.lastname, firstname: user.firstname };
                                        const token = jwt.sign(payloadToken, 'secret', { expiresIn: '30d' });
                                        return res.status(200).json({ result, token });
                                    });
                                }).on("error", (err) => {
                                    console.log("Error: " + err.message);
                                    res.status(500).json({ message: 'Something went wrong. Please try again later!' });
                                }); 

                            } else {
                                const payloadToken = { id: user._id };
                                const result = { _id: user._id, caption: user.caption, email: user.email, avatar: user.avatar, lastname: user.lastname, firstname: user.firstname };
                                const token = jwt.sign(payloadToken, 'secret', { expiresIn: '30d' });
                                return res.status(200).json({ result, token });
                            }
                        } else {
                            res.status(400).json({ message: "App Id was wrong!" })
                        }
                    });
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    res.status(500).json({ message: 'Something went wrong. Please try again later!' });
                }); 
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(500).json({ message: 'Something went wrong. Please try again later!' });
        });
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong. Please try again later!' });
    }
};

/* UserController.getProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        const profile = {
            email: user.email,
            name: `${user.firstname} ${user.lastname}`,
            avatar: user.avatar,
            username: user.username
        }
        return res.status(200).json(profile);

    } catch (error) {
        console.log(error);
    }
}; */

UserController.updateProfile = async (req, res) => {
    const id = req.params.id
    const { username, caption, lastname, firstname } = req.body;
    try {
        if(username) {
            const existingUsername = await User.aggregate([{ $match:  { $and : [{ username },{ _id : { $ne: new mongoose.Types.ObjectId(id)}}]}}]);
            if(existingUsername.length === 1) return res.status(400).json({message : "This username is already used. Please try another one."})
            const updatedUser = await User.findByIdAndUpdate(id, { caption, username, lastname, firstname }, { new: true}).select({  _id : 1, caption: 1, email : 1, username: 1, lastname: 1, firstname: 1, avatar: 1});
    
            return res.status(200).json(updatedUser);
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, { caption, email, lastname, firstname }, { new: true }).select({  _id : 1, caption: 1, email : 1, username: 1, lastname: 1, firstname: 1, avatar: 1});
            return res.status(200).json(updatedUser);
        }
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

UserController.updateAvatar = async (req, res) => {
    const id = req.params.id;
    const { body, name } = req.body;
    console.log(name)
    try {
       
        const finalPath = path.join(os.tmpdir(), name);
        console.log(finalPath);  
        const data = body.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(finalPath, data, {encoding: 'base64'});
        const result = await cloudinary.uploader.upload(finalPath); 
         const url = result.secure_url;

        const updatedUser = await User.findByIdAndUpdate(id, { avatar: url }, { new: true }).select({  _id : 1, caption: 1, email : 1, username: 1, lastname: 1, firstname: 1, avatar: 1});

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Can not upload avatar!. Please try another photo!'});
        
    }
};

UserController.searchAllUsers = async (req, res) => {
    const { searchTerm } = req.body;
    try {
        let userList = [];
        if(searchTerm[0] === '@') {
            const username = searchTerm.substring(1);
            userList = await User.aggregate([
                {
                    $match: { $and : [{username: username}, { _id: { $ne : new mongoose.Types.ObjectId(req.user._id)}}]}
                },
                {
                    $project: { _id: 1, username: 1, lastname: 1, firstname: 1, avatar: 1 }
                }
            ]);
        } else {
            userList = await User.aggregate([
                {
                    $match: { $and : [{ $or: [{ firstname: { $regex: new RegExp(searchTerm), $options: 'i' } }, { lastname: { $regex: new RegExp(searchTerm), $options: 'i' } }]},{ _id: { $ne : new mongoose.Types.ObjectId(req.user._id)}}]}
                },
                {
                    $project: { _id: 1, username: 1, lastname: 1, firstname: 1, avatar: 1 }
                }
            ]);
        }
     
        const conversationList = await Conversation.aggregate([
            {
                $match: { name: { $regex: new RegExp(searchTerm), $options: 'i' } }
            },
            {
                $match: { people: { $in: [new mongoose.Types.ObjectId(req.user._id)] } }
            },
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
                    let: { "lastMessageId": "$lastMessage" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$lastMessageId"] } } },
                        {
                            $lookup:
                            {
                                from: "users",
                                let: { "senderId": "$sender" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$senderId"] } } },
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
                $project: 
                { "peopleInfo.password": 0, "peopleInfo.email": 0,"peopleInfo.googleId": 0,"peopleInfo.facebookId": 0,
                  "lastMessageInfo.senderInfo.password": 0,"lastMessageInfo.senderInfo.email" : 0,"lastMessageInfo.senderInfo.googleId" : 0,"astMessageInfo.senderInfo.facebookId" : 0,
                    "hostInfo.password": 0,"hostInfo.email": 0, "hostInfo.googleId": 0, "hostInfo.facebookId": 0,
                }
            }
        ])


        async function addConversation(userList) {

            for (const user of userList) {
                const conversation = await Conversation.aggregate([
                    {
                        $match: { $and: [{ people: { $in: [new mongoose.Types.ObjectId(user._id)] } }, { people: { $in: [new mongoose.Types.ObjectId(req.user._id)] } }] }
                    },
                    {
                        $match: { $expr: { $eq: [{ $size: "$people" }, 2] } }
                    },
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
                        $lookup:
                        {
                            from: "users",
                            localField: "host",
                            foreignField: "_id",
                            as: "hostInfo",
                        }
                    },
                    {
                        $project: 
                        { "peopleInfo.password": 0, "peopleInfo.email": 0,"peopleInfo.googleId": 0,"peopleInfo.facebookId": 0,
                            "hostInfo.password": 0,"hostInfo.email": 0, "hostInfo.googleId": 0, "hostInfo.facebookId": 0,
                        }
                    }
                ]);
                user.conversation = conversation[0];
            }
        }
        await addConversation(userList);
        conversationList.forEach(conversation => {
            const userTemp = { conversation };
            userList.push(userTemp);
        });
       
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error)
    }
};

UserController.searchMembers = async (req, res) => {
    const { searchMem } = req.body;
    try {
        let userList = [];
        if(searchMem[0] === '@') {
            const searchTerm = searchMem.substring(1);
            userList = await User.aggregate([
                {
                    $match: { $and : [{ username: searchTerm }, { _id : { $ne : new mongoose.Types.ObjectId(req.user._id)}}]} 
                },
                {
                    $project: { _id: 1, username: 1, lastname: 1, firstname: 1, avatar: 1}
                }
            ]);
        } else {
            userList = await User.aggregate([
                {
                    $match: { $and : [{ $or: [{ firstname: { $regex: new RegExp(searchMem), $options: 'i' } }, { lastname: { $regex: new RegExp(searchMem), $options: 'i' } }]}, { _id : { $ne : new mongoose.Types.ObjectId(req.user._id)}}]} 
                },
                {
                    $project: { _id: 1, username: 1, lastname: 1, firstname: 1, avatar: 1}
                }
            ]);
        }
      
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error)
    }
};
module.exports = UserController;