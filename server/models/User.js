const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    username: { type: String },
    caption: String,
    password: { type: String},
    email: { type: String },
    lastname: { type: String, required: true},
    firstname: { type: String, required: true},
    avatar: String,
    createdAt: { type: String, default : Date.now }
})
userSchema.index({ firstname : 1, lastname: 1, username: 1})
module.exports = User =  mongoose.model("User", userSchema )