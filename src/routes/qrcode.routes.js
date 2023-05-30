const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const router = express.Router();

const { scanProduk, inputProduk } = require("../controllers/qrcode.controllers");

router.post("/inputProduk", inputProduk);
router.post("/scan", scanProduk);

module.exports = router;
