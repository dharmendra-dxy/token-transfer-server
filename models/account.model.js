const mongoose = require("mongoose");

// schema:
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to user model
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        require: true,
    }
}, {timestamps: true});

// model:
const Account = mongoose.model('account', accountSchema);

module.exports =Account;

