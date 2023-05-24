const product = require("../services/product.services");
const axios = require("axios");

const getAllProduct = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const result = await product.findAll(id_user);
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
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findLastScan(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const getFavoriteProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findAllByFavorite(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

const uploadProductScan = async (req, res) => {
  const imageUrl = "https://storage.googleapis.com/image-product-12/16848364527209965986921TsQii6UIlFgeKw0vdPQ0Jw.png";

  const { data } = await axios.post(
    "http://localhost:4000/post",
    { imageUrl: imageUrl },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.json({
    status: "yea",
    data: data,
  });
};

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
  const id_user = req.cookies.id_user;

  try {
    const result = await product.deleteAll(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

// module.exports = { getAllProduct, getDetailProduct, getLastScannedProduct, updateProductToFavoriteById, getFavoriteProduct, deleteAllProduct, deleteProductById };
module.exports = { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById };
