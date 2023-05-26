const db = require("../configs/db.configs");
const uploadImage = require("../helpers/upload-image.helpers");
const serviceProfile = require("../services/profile.services");
const serviceUser = require("../services/user.services");

const getDataProfile = async (req, res) => {
  const idUser = req.cookies.id_user;
  try {
    const result = await serviceProfile.getAllById(idUser);
    console.log(result);
    if (!result)
      return res.json({
        status: "error",
        message: "get data failed",
      });

    return res.status(200).json({
      status: "success",
      message: "get data success",
      data: result,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const updateEmail = async (req, res) => {
  const { email } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (!(await serviceUser.checkEmail(email)))
      return res.json({
        status: "error",
        message: "Email sudah digunakan oleh akun lain",
      });
    if (!(await serviceProfile.updateEmail(id_user, email)))
      return res.json({
        status: "error",
        message: "gagal mengganti email",
      });

    return res.json({
      status: "success",
      message: "berhasil mengubah email",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const updateTelepon = async (req, res) => {
  const { telepon } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (await serviceProfile.getAllByTelepon(telepon))
      return res.json({
        status: "error",
        message: "Nomor Telepon sudah digunakan oleh akun lain",
      });

    if (!(await serviceProfile.updateTelepon(id_user, telepon)))
      return res.json({
        status: "error",
        message: "gagal mengganti nomor telepon",
      });

    return res.json({
      status: "success",
      message: "berhasil mengubah nomor telepon",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const updateUsername = async (req, res) => {
  const { username } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (await serviceProfile.getAllByUsername(username))
      return res.json({
        status: "error",
        message: "Username sudah digunakan oleh akun lain",
      });

    if (!(await serviceProfile.updateUsername(id_user, username)))
      return res.json({
        status: "error",
        message: "gagal mengganti username",
      });

    return res.json({
      status: "success",
      message: "berhasil mengubah username",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const updateProfile = async (req, res, next) => {
  const id_user = req.cookies.id_user;
  try {
    const file = req.file;
    file.originalname = `${Date.now()}${id_user}${file.originalname}`;
    const publicUrl = await uploadImage(file);
    sql = `UPDATE users SET foto_user = '${publicUrl}' WHERE id_user = '${id_user}'`;
    const result = await db.query(sql);
    if (!result)
      return res.json({
        status: "error",
        message: "error update image profile",
      });
    res.status(200).json({
      status: "success",
      message: "success upload image",
      data: publicUrl,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProfile = async (req, res, next) => {
  const id_user = req.cookies.id_user;
  try {
    const defaultProfile = "https://storage.googleapis.com/staging_product/default-profile.jpg";
    const sql = `UPDATE users SET foto_user = '${defaultProfile}' WHERE id_user = '${id_user}'`;
    const result = await db.query(sql);
    if (!result)
      return res.json({
        status: "error",
        message: "Delete profile gagal",
      });

    return res.status(200).json({
      status: "success",
      message: "succes delete profile",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateEmail,
  updateTelepon,
  updateUsername,
  updateProfile,
  deleteProfile,
  getDataProfile,
};
