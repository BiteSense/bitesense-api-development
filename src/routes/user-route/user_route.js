const express = require("express");
const route = express.Router();

const myModule = require("../../controllers/handle-user/user_handler.js");

route.post("/register", myModule.handlerRegister);
route.post("/login", myModule.handlerLogin);

module.exports = route;
