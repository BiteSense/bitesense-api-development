const express = require("express");
const route = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const myModule = require("../../controllers/handle-user/user_handler.js");
const updateModule = require("../../controllers/handle-user/profile_handler.js");

route.post("/register", myModule.handlerRegister);
route.post("/login", myModule.handlerLogin);
route.delete("/logout", verifyToken, myModule.handlerLogout);
route.post("/profile/email", updateModule.updateEmail);
route.post("/profile/telepon", updateModule.updateTelepon);
route.post("/profile/username", updateModule.updateUsername);
route.post("/profile/upload", updateModule.updateProfile);
route.delete("/profile/delete", updateModule.deleteProfile);
route.get("/testing", verifyToken, (req, res) => {
  res.send("look at me");
});

module.exports = route;
