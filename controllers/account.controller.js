const {mongoose } = require("mongoose");
const Account = require("../models/account.model");


//[GET]  handleGetBalance:
async function handleGetBalance(req,res){

    const userid = req.userid;

    const user = await Account.findOne(userid);
    if(user){
        return res.status(200).json({
            message: "Account fetched succesfully",
            success: true,
            balance: user.balance,
        });
    }
    else return res.status(401).json({
        message: "Error while fetching account",
        success: false,
    });

}

//[POST]  handlePostTransferMoney:
async function handlePostTransferMoney(req,res){

    //  start session:
    const session = await mongoose.startSession(); 

    // start transaction:
    session.startTransaction();
    const {amount, receiverId} = req.body();
    
    const senderAccount = await Account.findOne({userId: req.userid}).session(session);

    if(!senderAccount || senderAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient account balance",
            success: false,
        });
    }

    const receiverAccount = await Account.findOne({userId: receiverId}).session(session);

    if(!receiverAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "No such receiver account exsits",
            success: false,
        });
    }

    // perform transactions:
    await Account.updateOne({userid: req.userid}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userid: receiverId}, {$inc: {balance: amount}}).session(session);

    // commit the transaction:
    await session.commitTransaction();

    return res.status(200).json({
        message: "Transfer made succesfully",
        success: true,
    });

}

module.exports = {
    handleGetBalance,
    handlePostTransferMoney,
}