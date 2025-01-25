const express = require("express");
const router= express.Router();

const {
    handleGetBalance,
    handlePostTransferMoney,
} = require("../controllers/account.controller");


router.get("/balance", handleGetBalance);
router.get("/transferMoney", handlePostTransferMoney);

module.exports = router;