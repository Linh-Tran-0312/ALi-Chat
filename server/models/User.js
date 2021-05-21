const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    caption: String,
    password: { type: String, required: true},
    email: { type: String, required: true},
    lastname: { type: String, required: true},
    firstname: { type: String, required: true},
    avatar: String,
    is_online: Boolean,
    friends: [ String ],
    createdAt: { type: String, default : Date.now }
})
userSchema.index({ firstname : 'text', lastname: 'text'})
module.exports = User =  mongoose.model("User", userSchema )