const db = require("../configs/db.configs");
const service = require("../services/preference.services");

const getPreference = async (req, res) => {
  const idUser = req.cookies.id_user;
  try {
    const dataPenyakit = await service.getAllPenyakit(idUser);
    const dataKondisi = await service.getAllKondisi(idUser);
    const dataFood = await service.getAllFood(idUser);
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success get data",
      data: {
        dataPenyakit,
        dataKondisi,
        dataFood,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const getDataPreference = async (req, res) => {
  try {
    const dataFood = await service.getDataFood();
    const dataKondisi = await service.getDataKondisi();
    const dataPenyakit = await service.getDataPenyakit();

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success get data preference",
      data: {
        dataFood,
        dataKondisi,
        dataPenyakit,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertPenyakit = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { penyakit } = req.body;
    sql = `INSERT INTO user_penyakit (id_user , id_penyakit) VALUES ('${id_user}','${penyakit}')`;
    await db.query(sql);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertFood = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { makanan } = req.body;
    sql = `INSERT INTO user_food (id_user , id_food) VALUES ('${id_user}','${makanan}')`;
    await db.query(sql);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertCondition = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { kondisi } = req.body;
    sql = `INSERT INTO user_condition (id_user , id_condition) VALUES ('${id_user}','${kondisi}')`;
    await db.query(sql);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "success input data",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = {
  insertPenyakit,
  insertCondition,
  insertFood,
  getPreference,
  getDataPreference,
};
