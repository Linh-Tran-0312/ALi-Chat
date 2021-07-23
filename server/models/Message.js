const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation'},
    sender: { type: Schema.Types.ObjectId, ref: 'User'},
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: String, default: Date.now },
    isFirst: { type: Boolean, default: false},
    isNotify: { type: Boolean, default: false},
    isReadBy: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    attachment: String,
    text: String
})
messageSchema.statics.getMessageInfo = async function(id) {
    const res = await Message.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup : {
                    from: 'users',
                    let : { "userId" : "$sender"},
                    pipeline: [
                        { $match : { $expr : { $eq : ["$_id", "$$userId"]}} },
                        { $project: { "_id": 1, "avatar": 1, "lastname" : 1, "firstname" : 1}}
                    ],
                    as : "senderInfo"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "isReadBy",
                foreignField: "_id",
                as: "isReadByInfo",
            }
        },
        {
            $project : 
            {
                _id : 1, recipients: 1, isFirst: 1, isNotify: 1, isReadBy: 1, conversation: 1,sender: 1,
                attachment: 1, text: 1, createdAt: 1, senderInfo: 1, "isReadByInfo._id": 1, "isReadByInfo.avatar" : 1
            }
        }
    ]);

    return res[0];
}
module.exports =  Message = mongoose.model("Message", messageSchema);