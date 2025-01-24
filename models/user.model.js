const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// userSchema:
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please enter a username"],
        trim: true,
        minLength: [3, "Minimum length for username is 3"],
        maxLength: [30, "Maximum length for username is 30"],
    },
    email: {
        type: String,
        unique: [true, "Please enter a unique email"],
        require: [true, "Please enter an email"],
        lowercase:[true, "Please enter a valid email"],
    },
    password: {
        type: String,
        required:[true, "Please enter a password"],
        minLength:[6, "Minimum length for password is 6"],
    }
}, {timestamps: true});


// pre save function to hash password using bcrypt:
userSchema.pre("save", async function(next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// static method to signin user:
userSchema.statics.signinUser = async function(email, password){
    const user = await User.findOne({email});
    
    if(user){
        // verify hash password:
        const auth = await bcrypt.compare(password, user.password);

        if(auth) return user;
        else return null;
    }
    else return null;
}

// userModel:
const User = mongoose.model("user", userSchema);

module.exports= User;