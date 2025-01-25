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
    
    const userid = req.userid;
    


}

module.exports = {
    handleGetBalance,
    handlePostTransferMoney,
}