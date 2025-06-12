const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : { type: String, default: "new User", maxLength: 255 },
    description: { type: String, default: "", maxLength: 255 },
    age: { type: Number },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("User", UserSchema);