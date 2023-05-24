const db = require("../configs/db.configs");

const findAll = async () => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail`;
  const result = await db.query(query);

  if (!result) {
    return {
      status: "error",
      message: "get data failed",
    };
  }
  return {
    statusCode: 200,
    status: "success",
    data: result[0],
  };
};

const findOne = async (id) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result[0][0]) {
    return {
      statusCode: 404,
      status: "error",
      message: "Product Not Found",
    };
  }
  return {
    statusCode: 200,
    status: "success",
    data: result[0][0],
  };
};

const updateOne = async (id) => {};

const findLastScan = async () => {};

const deleteOne = (id) => {};

const deleteAll = () => {};

const create = (product) => {};

module.exports = { findAll, findOne, updateOne, findLastScan, deleteOne, deleteAll, create };
