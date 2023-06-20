const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.addProduct = (req, res, next) => {
  Product.create({ price: req.body.price, productName: req.body.productName })
    .then((result) => {
      // console.log(result.id);
      res.json({
        id: result.id,
        price: req.body.price,
        productName: req.body.productName,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.userId;
  Product.destroy({ where: { id: prodId } })
    .then((rows) => {
      console.log("sussfully deleted", rows);
      res.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
