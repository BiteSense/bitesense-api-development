const db = require("../../configs/dbConfig");

const updateEmail = async (req, res) => {
  const { email } = req.body;
  const id_user = req.cookies.id_user;
  try {
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const result = await db.query(sql);
    if (result[0][0])
      return res.json({
        status: "error",
        message: "Email sudah digunakan oleh akun lain",
      });

    const sql1 = `UPDATE users SET email = '${email}' WHERE id_user = '${id_user}'`;
    const result1 = await db.query(sql1);
    if (!result1)
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
    const sql = `SELECT * FROM users WHERE no_telepon = '${telepon}'`;
    const result = await db.query(sql);
    if (result[0][0])
      return res.json({
        status: "error",
        message: "Nomor Telepon sudah digunakan oleh akun lain",
      });

    const sql1 = `UPDATE users SET no_telepon = '${telepon}' WHERE id_user = '${id_user}'`;
    const result1 = await db.query(sql1);
    if (!result1)
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
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await db.query(sql);
    if (result[0][0])
      return res.json({
        status: "error",
        message: "Username sudah digunakan oleh akun lain",
      });

    const sql1 = `UPDATE users SET username = '${username}' WHERE id_user = '${id_user}'`;
    const result1 = await db.query(sql1);
    if (!result1)
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

module.exports = {
  updateEmail,
  updateTelepon,
  updateUsername,
};
