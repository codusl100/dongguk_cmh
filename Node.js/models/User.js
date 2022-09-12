// models/User.js
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs"); // 암호화 모듈
const jwt = require("jsonwebtoken");

// mongoDB에 회원정보를 저장할 스키마를 userSchema에 정의
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        trim: true,  // 공백을 없애주는 역할
        unique: 1,  // 똑같은 이메일을 쓰지 못하도록
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    
})

// db에 저장된 유저와 비교
userSchema.methods.comparePassword=function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken=function(cb){
    const user=this;
    const token=jwt.sign(user._id.toHexString(), 'secretToken');
    user.token=token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
}

userSchema.metho

// 데이터베이스 모델을 정의
const User = mongoose.model('User', userSchema)
module.exports = User