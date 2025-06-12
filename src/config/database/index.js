const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DATABASE);
        console.log("Connect Database Successfully!");
    } catch (error) {
        console.error("Connect Database failed!", error);
        process.exit(1);
    }
}
module.exports = { connectDB }