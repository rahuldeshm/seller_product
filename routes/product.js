const express = require("express");

const product = require("../controllers/product");

const router = express.Router();

router.get("/product", product.getProducts);
router.post("/product", product.addProduct);
router.delete("/product/:userId", product.deleteProduct);

module.exports = router;
