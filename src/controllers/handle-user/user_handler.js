const bcrypt = require("bcrypt");
const db = require("../../configs/dbConfig");
const jwt = require("jsonwebtoken");

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
  const emailExicst = `SELECT email from users WHERE email = '${email}'`;
  const exicst = await db.query(emailExicst);
  if (exicst[0][0]) {
    return res.json({
      status: "error",
      message: "Email Already Exicst",
    });
  }

  //Enkrip Password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  //Create Id
  const id_user = Math.floor(Math.random() * 1000000000 + 1);
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
const handlerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check Email
    const emailExicst = `SELECT * FROM users WHERE email = '${email}'`;
    const exisct = await db.query(emailExicst);
    // Checking data in database which given by email parser from body
    if (!exisct[0][0]) {
      return res.json({
        status: "error",
        message: "Email belum pernah didaftarkan",
      });
    }
    const data = exisct[0][0];
    const match = await bcrypt.compare(password, data.password);

    if (!match) {
      return res.json({
        status: "error",
        message: "Email or Password salah",
      });
    }

    const userid = data.id_user;
    const token = jwt.sign({ userid }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const sql = `UPDATE users SET token = '${token}' WHERE id_user = '${userid}'`;
    const result = await db.query(sql);
    if (!result) {
      return res.json({
        status: "error",
      });
    }
    res.cookie("token", token);
    res.cookie("id_user", userid);

    res.send({ token });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const handlerLogout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(204).json({
        status: "error",
        message: "Unauthorize",
      });

    const sql = `SELECT token FROM users WHERE token = '${token}'`;
    const result = await db.query(sql);

    const data = result[0][0];
    if (!data)
      return res.status(204).json({
        status: "error",
        message: "Unauthorize",
      });

    const sql1 = `UPDATE users SET token = NULL WHERE id_user = '${data.id_user}'`;
    const result1 = await db.query(sql1);

    if (result1[0][0])
      return res.json({
        status: "error",
        message: "Gagal Logout",
      });

    res.clearCookie("id_user");

    res.clearCookie("token").json({
      status: "success",
      message: "Logout berhasil",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  handlerRegister,
  handlerLogin,
  handlerLogout,
};
