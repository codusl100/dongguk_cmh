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
            // email을 비교해서 user가 이미 존재하는지 확인
            // 존재한다면 return해서 뒤의 코드를 실행하지 않음.
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            };

            // user가 존재하지 않으면 새로운 user에 대해서 DB에 추가
            user = new User({
                name,
                email,
                password,
                address,
            });

            // bcrypt 모듈을 이용해 salt값을 부여하며 password 암호화
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // 암호화된 내용까지 포함해 DB에 user를 저장.
            await user.save();

            const payload = { // json web token 으로 변환할 데이터 정보
                user: {
                    id: user.id,
                },
            };
            // json web token 생성하여 send 해주기
            jwt.sign(
                payload, // 변환할 데이터
                "jwtSecret", // secret key 값
                { expiresIn: "1h" }, // token의 유효시간
                (err, token) => {
                    if (err) throw err;
                    res.send({ token }); // token 값 response 해주기
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        };
    });
  
  //Read
  router.get('/', function (req, res, next) {
    const id = req.query.user_id;
    //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    User.findAll()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
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