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

const findLastScan = async () => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail ORDER BY id_produk DESC LIMIT 5`;
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

const findAllByFavorite = async () => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE favorite = true`;
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

const create = async (product) => {};

const updateOne = async (id) => {
  const query = `SELECT favorite from produk WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result[0][0]) {
    return {
      statusCode: 404,
      status: "error",
      message: "Product Not Found",
    };
  }

  const favorite = !result[0][0].favorite;
  const query1 = `UPDATE produk SET favorite = ? WHERE id_produk = ?`;
  const result1 = await db.query(query1, { replacements: [favorite, id] });

  if (!result1) {
    return {
      statusCode: 403,
      status: "error",
      message: "Product failed to update",
    };
  }
  return {
    statusCode: 202,
    status: "success",
    message: "Product has been updated",
  };
};

const deleteOne = async (id) => {
  const query = `DELETE from produk WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result) {
    return {
      status: "error",
      message: "Failed to delete Product",
    };
  }

  return {
    statusCode: 202,
    status: "success",
    message: "Product has been deleted",
  };
};

const deleteAll = async () => {
  const query = `TRUNCATE TABLE produk`;
  const result = await db.query(query);

  if (!result) {
    return {
      status: "error",
      message: "Failed to delete All Product",
    };
  }

  return {
    statusCode: 202,
    status: "success",
    message: "All Product has been deleted",
  };
};

module.exports = { findAll, findOne, findLastScan, findAllByFavorite, create, updateOne, deleteOne, deleteAll };
