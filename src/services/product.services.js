const db = require("../configs/db.configs");

const findScan = async (jumlah_scan_produk, id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ? ORDER BY id_produk DESC LIMIT ${jumlah_scan_produk}`;
  const result = await db.query(query, { replacements: [id_user] });

  return {
    statusCode: 200,
    status: "success",
    message: "Yeas Baby",
    data: result[0],
  };
};

const findAll = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ?`;
  const result = await db.query(query, { replacements: [id_user] });

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

const findLastScan = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ? ORDER BY id_produk DESC LIMIT 5`;
  const result = await db.query(query, { replacements: [id_user] });

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

const findAllByFavorite = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE favorite = true AND id_user = ?`;
  const result = await db.query(query, { replacements: [id_user] });

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

const create = async (products, id_user) => {
  if (products.length == 0) {
    return {
      statusCode: 404,
      status: "error",
      message: "Prodcut not Found",
    };
  } else {
    for (let i = 0; i < products.length; i++) {
      const query = `SELECT id_detail from detail_produk WHERE nama_produk = ?`;
      const result = await db.query(query, { replacements: [products[i].nama] });

      if (!result[0][0]) {
        return {
          statusCode: 404,
          status: "error",
          message: "Product Name Incorrect",
        };
      }
      const query1 = `INSERT INTO produk (nama_produk, foto_produk, alert, favorite, id_user, id_detail) VALUES (?,?,?,?,?,?)`;
      const result1 = await db.query(query1, { replacements: [products[i].nama, products[i].image, null, false, id_user, result[0][0].id_detail] });

      if (!result1) {
        return {
          status: "error",
          message: "Failed to input product",
        };
      }
    }
  }

  return {
    statusCode: 201,
    status: "success",
    message: "Succes Input Product",
  };
};

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

const deleteAll = async (id_user) => {
  const query = `DELETE FROM produk WHERE id_user = ?`;
  const result = await db.query(query, { replacements: [id_user] });

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

module.exports = { findScan, findAll, findOne, findLastScan, findAllByFavorite, create, updateOne, deleteOne, deleteAll };
