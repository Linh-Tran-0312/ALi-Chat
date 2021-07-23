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
conversationSchema.statics.getConversationInfo = async function(id) {
   const res = await this.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id)} },
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
                let: {"lastMessageId" : "$lastMessage"},
                pipeline : [
                    { $match: { $expr : { $eq : ["$_id", "$$lastMessageId"]}}},
                    {
                        $lookup: 
                        {
                            from: 'users',
                            let: {"senderId" : "$sender"},
                            pipeline : [
                                { $match : { $expr : { $eq: ["$_id", "$$senderId"]}}}
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
    ]);
   return res[0]
}
module.exports = Conversation = mongoose.model('Conversation', conversationSchema);