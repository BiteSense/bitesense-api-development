const express = require("express");
const route = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const myModule = require("../../controllers/handle-user/user_handler.js");
const updateModule = require("../../controllers/handle-user/profile_handler.js");
const uploadModule = require("../../controllers/handle-user/upload_handler.js");
const preferenceModule = require("../../controllers/handle-user/preference_handler.js");

// User Routes
route.post("/register", myModule.handlerRegister);
route.post("/login", myModule.handlerLogin);
route.delete("/logout", verifyToken, myModule.handlerLogout);

// Profile Routes
route.get("/profile", verifyToken, updateModule.getDataProfile);
route.post("/profile/email", verifyToken, updateModule.updateEmail);
route.post("/profile/telepon", verifyToken, updateModule.updateTelepon);
route.post("/profile/username", verifyToken, updateModule.updateUsername);
route.post("/profile/upload", verifyToken, updateModule.updateProfile);
route.delete("/profile/delete", verifyToken, updateModule.deleteProfile);

// Upload Routes
route.post("/upload", verifyToken, uploadModule);

// Preference Routes
route.get("/preference", verifyToken, preferenceModule.getPreference);
// Category Penyakit
route.post("/preference/penyakit", verifyToken, preferenceModule.insertPenyakit);
// Category Food Intolarance
route.post("/preference/makanan", verifyToken, preferenceModule.insertFood);
// Category Condition
route.post("/preference/kondisi", verifyToken, preferenceModule.insertCondition);

module.exports = route;
