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

module.exports = { getAllProduct, getDetailProduct };
//module.exports = { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById };
