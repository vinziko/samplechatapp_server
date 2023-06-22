const mongoose =  require('mongoose');
const messageSchema = new mongoose.Schema({
    message:{
        text: { type:String, required:true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users:Array,
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
},
{
    timestamps: true
})

module.exports = mongoose.model('Messages',messageSchema);

// Message.find(({ users: { "$in" : [#user1#,#user2#]} })
//     .sort({ updatedAt: -1 })
//     .limit(20)