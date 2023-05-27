const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("../services/user.services");

const handlerRegister = async (req, res) => {
  const { username, email, password, repassword } = req.body;
  //Checking password
  if (password != repassword) {
    return res.status(400).json({
      status: "error",
      message: "Password and Repassword different",
    });
  }
  //Checking Already email
  if ((await service.checkEmail(email)) === false) {
    return res.status(400).json({
      status: "error",
      message: "Email Already Exicst",
    });
  }
  //Enkrip Password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    service.registerUser(username, email, hashPassword);
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success register",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const handlerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check Email
    if (await service.checkEmail(email)) {
      return res.status(400).json({
        status: "error",
        message: "Email belum pernah didaftarkan",
      });
    }
    const data = await service.getAllByEmail(email);
    const match = await bcrypt.compare(password, data.password);

    if (!match) {
      return res.status(400).json({
        status: "error",
        message: "Email or Password salah",
      });
    }

    const userid = data.id_user;
    const token = jwt.sign({ userid }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await service.updateUserToken(token, userid);
    res.cookie("token", token);
    res.cookie("id_user", userid);

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success login",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
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

    const data = await service.getAllByToken(token);
    if (!data)
      return res.status(204).json({
        status: "error",
        message: "Unauthorize",
      });
    await service.clearToken(data.id_user);

    res.clearCookie("id_user");

    res.clearCookie("token");
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Logout berhasil",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = {
  handlerRegister,
  handlerLogin,
  handlerLogout,
};
