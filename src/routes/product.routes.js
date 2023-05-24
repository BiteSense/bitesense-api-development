const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");

// const { getAllProduct, getDetailProduct, getLastScannedProduct, getFavoriteProduct, updateProductToFavoriteById, deleteProductById, deleteAllProduct } = require("../controllers/product.controllers");
const { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById } = require("../controllers/product.controllers");

//Route to handler Image product from User and show Result to User

router.get("/all", auth, getAllProduct);
router.get("/detail/:id", auth, getDetailProduct);
router.get("/lastScan", auth, getLastScannedProduct);
router.get("/favorite", auth, getFavoriteProduct);
router.post("/upload", auth, uploadProductScan);
router.post("/update/:id", auth, updateProductToFavoriteById);
router.delete("/delete/:id", auth, deleteProductById);
router.delete("/delete", auth, deleteAllProduct);

module.exports = router;
