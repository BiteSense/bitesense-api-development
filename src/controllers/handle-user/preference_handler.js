const db = require("../../configs/dbConfig.js");
const Sequelize = require("sequelize");
// const convertToArray = require("../../helper/convertToArray.js");

const getPreference = async (req, res) => {
  const idUser = req.cookies.id_user;
  try {
    const sql = `
    SELECT p.nama_penyakit FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${idUser}'
    `;
    await db.query(sql, { type: Sequelize.QueryTypes.SELECT }).then((result) => {
      return res.status(200).json({
        status: "success",
        message: "success getAll preference",
        data: {
          result,
        },
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const insertPenyakit = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { penyakit } = req.body;
    sql = `INSERT INTO user_penyakit (id_user , id_penyakit) VALUES ('${id_user}','${penyakit}')`;
    const result = await db.query(sql);
    console.log(result);
    if (!result)
      return res.json({
        status: "error",
        message: "failed input data",
      });

    return res.status(200).json({
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const insertFood = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { makanan } = req.body;
    sql = `INSERT INTO user_food (id_user , id_food) VALUES ('${id_user}','${makanan}')`;
    const result = await db.query(sql);
    if (!result)
      return res.json({
        status: "error",
        message: "failed input data",
      });

    return res.status(200).json({
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};
const insertCondition = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { kondisi } = req.body;
    sql = `INSERT INTO user_condition (id_user , id_condition) VALUES ('${id_user}','${kondisi}')`;
    const result = await db.query(sql);
    if (!result)
      return res.json({
        status: "error",
        message: "failed input data",
      });

    return res.status(200).json({
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  insertPenyakit,
  insertCondition,
  insertFood,
  getPreference,
};
