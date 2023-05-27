const db = require("../configs/db.configs");

const getAllById = async (id_user) => {
  const sql = `SELECT u.username , u.email , u.no_telepon , u.foto_user FROM users AS u WHERE id_user = '${id_user}'`;
  const result = await db.query(sql);
  return result[0][0];
};

const updateEmail = async (id_user, email) => {
  const sql = `UPDATE users SET email = '${email}' WHERE id_user = '${id_user}'`;
  const result = await db.query(sql);

  return result;
};
const updateTelepon = async (id_user, telepon) => {
  const sql = `UPDATE users SET no_telepon = '${telepon}' WHERE id_user = '${id_user}'`;
  const result = await db.query(sql);

  return result;
};
const getAllByTelepon = async (telepon) => {
  const sql = `SELECT * FROM users WHERE no_telepon = '${telepon}'`;
  const result = await db.query(sql);

  return result[0][0];
};
const getAllByUsername = async (username) => {
  const sql = `SELECT * FROM users WHERE username = '${username}'`;
  const result = await db.query(sql);

  return result[0][0];
};

const updateUsername = async (id_user, username) => {
  const sql = `UPDATE users SET username = '${username}' WHERE id_user = '${id_user}'`;
  const result = await db.query(sql);

  return result;
};

module.exports = {
  getAllById,
  updateEmail,
  getAllByTelepon,
  updateTelepon,
  getAllByUsername,
  updateUsername,
};
