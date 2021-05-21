const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    people: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    host: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    attachments: [{ type: String }],
    lastMessage: { type:  Schema.Types.ObjectId, ref: 'Message'},
    createdAt: { type: String, default: Date.now}
});

module.exports = Conversation = mongoose.model('Conversation', conversationSchema);