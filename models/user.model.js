const mongoose = require("mongoose");

// userSchema:
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase:true,
    },
    password: {
        type: String,
        required:true,
        minLength:6,
    }
});


// userModel:
const User = mongoose.model("user", userSchema);

module.exports= User;