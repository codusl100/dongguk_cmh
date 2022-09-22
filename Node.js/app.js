const express = require("express");
const connectDB = require("./db")
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:3000"
  };

const upload = require('./routes/waste-upload')

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to our application."});
})

// allow us to get the data in request.body
app.use(express.json({ extended: false })); 
// Define Routes
app.use("/user/register", require("./routes/register"));
connectDB();
app.use("/user/auth", require("./routes/auth"));
app.use(cookieParser());
app.use("/user/login", require("./routes/login"))
app.post('/single', upload.single('img'), (req, res, next) => {
  res.status(201).send(req.file);
});
//app.get('/user/logOut', function(req, res) {
//    return res.clearCookie('User').end();
//});
app.use('/mypage', require("./routes/mypage"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//app.post('/imageupload', require("./routes/DL"));
//app.use('/pay', require())
//app.listen(port, () => console.log(`Server started on port ${port}`));