const db = require("../../configs/dbConfig.js");

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
};
