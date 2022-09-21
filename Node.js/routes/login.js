const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

router.post('/', (req, res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Unvalid email"
            });
        }
    user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch)
            return res.json({
                loginSuccess:false,
                message:"Wrong password"
            });
    user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
            loginSuccess: true,
            userId: user._id,
            token: user.token,
            name: user.name,
            email: user.email,
            password: user.password
            });
        });        
        });
    });
});

module.exports = router;