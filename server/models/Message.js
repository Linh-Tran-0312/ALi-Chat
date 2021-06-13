const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation'},
    sender: { type: Schema.Types.ObjectId, ref: 'User'},
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: String, default: Date.now },
    isFirst: { type: Boolean, default: false},
    attachment: String,
    text: String
})

module.exports =  Message = mongoose.model("Message", messageSchema);