const product = require("../services/product.services");

const getAllProduct = async (req, res) => {
  try {
    const result = await product.findAll();
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const getDetailProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await product.findOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const getLastScannedProduct = async (req, res) => {
  try {
    const result = await product.findLastScan();
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const getFavoriteProduct = async (req, res) => {
  try {
    const result = await product.findAllByFavorite();
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const uploadProductScan = async (req, res) => {};

const updateProductToFavoriteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await product.updateOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await product.deleteOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const deleteAllProduct = async (req, res) => {
  try {
    const result = await product.deleteAll();
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

module.exports = { getAllProduct, getDetailProduct, getLastScannedProduct, updateProductToFavoriteById, getFavoriteProduct, deleteAllProduct, deleteProductById };
// module.exports = { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById };
