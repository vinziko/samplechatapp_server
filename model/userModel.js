const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        min:3,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password: {
        type:String,
        required:true,
        max:50,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        dafault:false,
    },
    avatarImage:{
        type:String,
        default:'',
    }
})

module.exports = mongoose.model('Users',userSchema);