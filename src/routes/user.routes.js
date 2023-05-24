const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth.middlewares");
const userModule = require("../controllers/user.controllers");
const profileUserModule = require("../controllers/profile-user.controllers");
// const preferenceUserModule = require("../../controllers/handle-user/preference_handler.js");

// User Routes
route.post("/register", userModule.handlerRegister);
route.post("/login", userModule.handlerLogin);
route.delete("/logout", auth, userModule.handlerLogout);

// Profile Routes
route.get("/profile", auth, profileUserModule.getDataProfile);
route.post("/profile/email", auth, profileUserModule.updateEmail);
route.post("/profile/telepon", auth, profileUserModule.updateTelepon);
route.post("/profile/username", auth, profileUserModule.updateUsername);
route.post("/profile/upload", auth, profileUserModule.updateProfile);
route.delete("/profile/delete", auth, profileUserModule.deleteProfile);

// Preference Routes
// route.get("/preference", auth, preferenceUserModule.getPreference);
// Category Penyakit
// route.post("/preference/penyakit", auth, preferenceUserModule.insertPenyakit);
// Category Food Intolarance
// route.post("/preference/makanan", auth, preferenceUserModule.insertFood);
// Category Condition
// route.post("/preference/kondisi", auth, preferenceUserModule.insertCondition);

module.exports = route;
