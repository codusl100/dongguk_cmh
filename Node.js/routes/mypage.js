const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // middleware 불러오기
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get('/', auth, (req, res)=>{
    User.findById(req.user.id).select("-password")
    .then(data => {
        res
        .status(201)
        .send({
            user: {
                email : data.email,
                name : data.name,
                address : data.address
            }
        })
    })
})

router.put('/edit', auth, (req, res)=>{
    let body = req.body;

    User.findById(req.user.id).select("-password")
    .updateMany({
        name: body.name, 
        password: body.password, 
        address: body.address
    })
    .then(data => {
        console.log(data)
        res.status(200).send(data)
    })
})
module.exports = router;