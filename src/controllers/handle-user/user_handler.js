const Users = require("../../models/user/user_model");
const bcrypt = require("bcrypt");
const db = require("../../configs/dbConfig");

const handlerRegister = async (req, res) => {
  const { username, email, password, repassword } = req.body;
  //Checking password
  if (password != repassword) {
    return res.json({
      status: "error",
      message: "Password and Repassword different",
    });
  }

  //Checking Already email
  emailExicst = `SELECT email from users WHERE email = ${email}`;
  if (emailExicst) {
    return res.json({
      status: "error",
      message: "Email Already Exicst",
    });
  }

  //Enkrip Password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  //Create Id
  const id_user = Math.floor(Math.random() * 1000000 + 1);
  // Default foto
  const foto_user = "https://storage.googleapis.com/staging_product/default-profile.jpg";
  try {
    const sql = `INSERT INTO users (id_user, username, email, password, token, no_telepon, foto_user) VALUES ('${id_user}', '${username}', '${email}', '${hashPassword}', NULL, NULL, '${foto_user}')`;
    db.query(sql);
    return res.status(200).json({
      code: 200,
      status: "success",
    });
  } catch (error) {
    return res.json(error);
  }
};
const handlerLogin = (req, res) => {
  return res.json("1");
};

module.exports = {
  handlerRegister,
  handlerLogin,
};
