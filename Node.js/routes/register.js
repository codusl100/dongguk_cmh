const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs"); // 암호화 모듈
const jwt = require("jsonwebtoken");


//Register
router.post(
    "/",
    async (req, res) => {
        const { name, email, password, address } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            };

            user = new User({
                name,
                email,
                password,
                address,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = { // json web token 으로 변환할 데이터 정보
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload, // 변환할 데이터
                "jwtSecret", // secret key 값
                { expiresIn: "1h" }, // token의 유효시간
                (err, token) => {
                    if (err) throw err;
                    res.cookie("x_auth", user.token);
                    res.json({"isSuccess": true,
                  "message": "요청에 성공하였습니다.",
                  "refreshToken": token
                })
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        };
    });
  
  
  // Delete
  router.delete('/:id', function (req, res, next) {
    const id = req.params.user_id;
  
    User.destroy({
      where: { user_sn: user_id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.status(500).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  });
  
module.exports = router;