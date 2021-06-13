const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const mongoose  = require('mongoose');
const User = require('../models/User.js');
const Conversation = require('../models/Conversation');

const UserController = {};

UserController.signIn = async( req, res ) => {
    
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User don't exist"});
        const isValidPassword = bcrypt.compare(password, existingUser.password);
        if(!isValidPassword) return res.status(400).json({ message: 'Password is not correct'});

        const payload = { email: existingUser.email, id: existingUser._id};
        const result = { _id: existingUser._id, email: existingUser.email, avatar : existingUser.avatar , lastname : existingUser.lastname, firstname: existingUser.firstname};
        const token = jwt.sign(payload, 'secret', { expiresIn: '30d'});

        return res.status(200).json({ result , token});

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }

}

UserController.signUp = async(req,res) => {
        const {  firstname, lastname, email, password, confirm_password } = req.body;
        try {
            
            const existingUser = await User.findOne({ email });
           

            if(existingUser) return res.status(400).json({ message: "This email is already signed up."});
           
            if(password !== confirm_password) return res.status(400).json({ message: "Password don't match."});
            
            const hashPassword =  bcrypt.hashSync(password, 10);
            console.log(hashPassword);
            const user = await User.create({ lastname, firstname, email, password: hashPassword });

            const result = { _id: user._id, email: user.email, avatar : user.avatar , lastname : user.lastname, firstname: user.firstname };
            const payload = { email: user.email, id: user._id};

            const token = jwt.sign(payload, 'secret', { expiresIn: '30d'});
             

            return res.status(200).json({ result, token });
        
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong. Please try again later.' });
        }
};

UserController.getProfile = async(req, res) => {
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
}

UserController.updateProfile = async(req, res) => {
    const { avatar, username, lastname, firstname } = req.body ;
    try {
        
        const user = await User.findById(req.userId);
        const updatedUser = await User.findByIdAndUpdate(req.userId, { ...user, avatar, username, lastname, firstname}, { new : true });

        return res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}
UserController.updateAvatar = async(req, res) => {
     console.log('da toi controller')
    try {
         const result = await cloudinary.uploader.upload(req.file.path);
          
         const url = result.url;
         const updatedUser = await User.findByIdAndUpdate(req.user._id, {avatar : url}, { new : true});
         
         return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(err);
    }
}
UserController.searchUsers = async(req, res ) => {
    const { searchTerm } = req.body;
    console.log(searchTerm);
    try {
       
        const userList = await User.find({ $text : { $search: searchTerm}});
        console.log(userList);
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

UserController.searchAllUsers = async(req, res) => { 
    const { searchTerm } = req.body;
    try {
        const userList = await User.aggregate([
            {
                $match : { $or : [{ firstname : { $regex: new RegExp(searchTerm), $options: 'i'}},{ lastname : { $regex: new RegExp(searchTerm), $options: 'i'}}]} 
            }
        ]);
        const conversationList = await Conversation.aggregate([
            {
                $match: { name : { $regex: new RegExp(searchTerm), $options: 'i'}}
            },
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
                    let : { "lastMessageId" : "$lastMessage"},
                    pipeline : [
                        { $match: { $expr : { $eq : ["$_id", "$$lastMessageId"]}}},
                        {
                            $lookup :
                            {
                                from : "users",
                                let : { "senderId" : "$sender"},
                                pipeline: [
                                    { $match : { $expr : { $eq : ["$_id", "$$senderId"]}}},
                                ],
                                as: "senderInfo"
                            }
                        }
                    ],
                    as : "lastMessageInfo",
                }
            },
            {
                $lookup : 
                {
                    from : "users",
                    localField: "host",
                    foreignField: "_id",
                    as : "hostInfo",
                }
            },
        ])
      
   
         async function addConversation(userList) {
        
               for(const user of userList) {
                const conversation = await Conversation.aggregate([
                    {
                        $match: { $and : [{people: { $in : [new mongoose.Types.ObjectId(user._id)] }},{people: { $in : [new mongoose.Types.ObjectId(req.user._id)] }}]}
                    },
                    {
                        $match : { $expr : { $eq : [{ $size : "$people"}, 2]}}
                    },
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
                        $lookup : 
                        {
                            from : "users",
                            localField: "host",
                            foreignField: "_id",
                            as : "hostInfo",
                        }
                    },
                ]);
                user.conversation = conversation[0];
               }
         } 
        await addConversation(userList); 
         conversationList.forEach( conversation =>  {
             const userTemp = { conversation};
             userList.push(userTemp);
         });
         console.log(userList);
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error)
    }
}
UserController.searchMembers = async(req,res) => {
    const { searchMem }= req.body;
    try {
        const userList = await User.aggregate([
            {
                $match : { $text: { $search : searchMem}}
            }
        ]);
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error)
    }
}
module.exports = UserController;