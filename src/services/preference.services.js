const db = require("../configs/db.configs");

const getAllPenyakit = async (idUser) => {
  const sql = `
    SELECT p.nama_penyakit , p.triger_penyakit FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${idUser}'
    GROUP BY p.nama_penyakit;
    `;

  const result = await db.query(sql);
  return result[0];
};
const getAllKondisi = async (idUser) => {
  const sql = `
    SELECT c.name_condition , c.triger_condition FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${idUser}'
    GROUP BY c.name_condition;
    `;

  const result = await db.query(sql);
  return result[0];
};
const getAllFood = async (idUser) => {
  const sql = `
    SELECT f.name_food , f.triger_food FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${idUser}'
    GROUP BY f.name_food;
    `;

  const result = await db.query(sql);
  console.log(result[0]);
  return result[0];
};
const getDataPenyakit = async () => {
  sql = `SELECT c.nama_penyakit FROM penyakit AS c`;
  const result = await db.query(sql);
  return result[0];
};
const getDataFood = async () => {
  sql = `SELECT f.name_food FROM food AS f`;
  const result = await db.query(sql);
  return result[0];
};
const getDataKondisi = async () => {
  sql = `SELECT c.name_condition FROM kondisi AS c`;
  const result = await db.query(sql);
  return result[0];
};

module.exports = {
  getAllPenyakit,
  getAllKondisi,
  getAllFood,
  getDataKondisi,
  getDataFood,
  getDataPenyakit,
};
