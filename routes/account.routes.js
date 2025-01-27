const express = require("express");
const isAuthenticated = require("../middlewares/auth.middleware");

const router= express.Router();
const {
    handleGetBalance,
    handlePostTransferMoney,
} = require("../controllers/account.controller");


router.get("/balance", isAuthenticated, handleGetBalance);
router.post("/transfer", isAuthenticated, handlePostTransferMoney);

module.exports = router;