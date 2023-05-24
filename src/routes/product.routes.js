const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");

const { getAllProduct, getDetailProduct, getLastScannedProduct, getFavoriteProduct, updateProductToFavoriteById, deleteProductById, deleteAllProduct } = require("../controllers/product.controllers");
//const { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById } = require("../controllers/product.controllers");

//Route to handler Image product from User and show Result to User

router.get("/all", getAllProduct);
router.get("/detail/:id", getDetailProduct);
router.get("/lastScan", getLastScannedProduct);
router.get("/favorite", getFavoriteProduct);
// router.post("/upload", auth, uploadProductScan);
router.post("/update/:id", updateProductToFavoriteById);
router.delete("/delete/:id", deleteProductById);
router.delete("/delete", deleteAllProduct);

module.exports = router;
