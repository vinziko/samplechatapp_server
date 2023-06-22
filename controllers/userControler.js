const User = require('../model/userModel');
const bcrypt = require('bcrypt');
module.exports.register = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body
        const usernameCheck = await User.findOne({username: username})
        if (usernameCheck) return res.json({message:"Username already exists",status:false})
        const emailCheck = await User.findOne({email: email})
        if (emailCheck) return res.json({message:"Email Already Exists",status:false})
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
        email,
        username,
        password:hashedPassword,
        })
        delete user.password;
        return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }
}


module.exports.login = async(req,res,next)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username: username})
        if (!user) return res.json({message:"Incorect username or password",status:false})
        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch) return res.json({message:"Incorect username or password",status:false})
        delete user.password
        return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }


}

module.exports.setAvatar = async(req,res,next)=>{
   try{
    const userId = req.params.id
    const avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(userId,{
        isAvatarImageSet:true,
        avatarImage,
    })
    return res.json({
        isSet:userData.isAvatarImageSet,
        image:userData.avatarImage,
    })
   }catch(ex){
    next(ex)
   }
}

module.exports.getAllUsers = async(req,res,next)=>{
    try{
     const user = await User.find({_id:{$ne:req.params.id}})
     return res.json(user)
    }catch(ex){
     next(ex)
    }
 }