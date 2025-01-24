const express = require("express");
const router= express.Router();

const {
    handleGetBalance,
    handlePostTransferMoney,
} = require("../controllers/account.controllers");


router.get("/balance", handleGetBalance);
router.get("/transferMoney", handlePostTransferMoney);

module.exports = router;