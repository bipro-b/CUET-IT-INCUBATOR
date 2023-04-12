const User = require("../models/User");

exports.signUpService = async(userInfo)=>{
    const result = await User.create(userInfo);
    return result;
}

exports.findUserService = async(email)=>{
    const user = await User.findOne({email});

    return user;
}