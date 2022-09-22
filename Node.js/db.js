// db.js
const mongoose = require("mongoose");
const connection = require("./connection.json");
require('dotenv').config();

const uri = connection.mongoURL;

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL
        );

        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;