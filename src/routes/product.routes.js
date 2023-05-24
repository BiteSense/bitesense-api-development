const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");

const { getAllProduct, getDetailProduct } = require("../controllers/product.controllers");
//const { getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById } = require("../controllers/product.controllers");

//Route to handler Image product from User and show Result to User

router.get("/history", getAllProduct);
router.get("/:id", getDetailProduct);
// router.get("/lastScan", auth, getLastScannedProduct);
// router.get("/favorite", auth, getFavoriteProduct);
// router.post("/upload", auth, uploadProductScan);
// router.post("/update/:id", auth, updateProductToFavoriteById);
// router.delete("/delete/:id", auth, deleteProductById);
// router.delete("delete", auth, deleteAllProduct);

module.exports = router;
