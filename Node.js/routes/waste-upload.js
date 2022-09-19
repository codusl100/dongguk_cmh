// 폐기물 사진 촬영 업로드
const express = require("express");
const router = express.Router();
const multer = require("multer");

const s3 = new AWS.S3({
    accessKeyId: ' ', // 액세스 키 입력
    secretAccessKey: ' ', // 비밀 액세스 키 입력
    region: ' ', // 사용자 사용 지역 (서울의 경우 ap-northeast-2)
});

const upload = multer({ 
    storage: multerS3({ 
        s3: s3, 
        bucket: 'cmh-project', // 버킷 이름 입력 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => { 
            cb(null, `uploads/${Date.now()}_${file.originalname}}`)
        }
    })
});

module.exports = upload;

// multer-optional
/*var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // uploads 폴더 생성 후 폴더에 파일 저장
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // '현재시각_파일원래이름'으로 파일 이름 저장
    },
   });
   var upload = multer({ storage: storage });
   
   // Router
   router.post("/", upload.array('가구 분류'), (req, res) => {
       try {
           res.send({ //파일 정보 넘김
               message: "upload success",
               status: 'success',
               data: {
                   files: req.files
               }
           });
       } catch (err) { //무언가 문제가 생김
           res.send({
               message: "ERROR",
               status: 'fail'
           })
       }
   });
   
   module.exports = router;*/