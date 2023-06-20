const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const Product = require("./models/product");

const app = express();
app.use(cors());

const productRoutes = require("./routes/product");

app.use(bodyParser.json({ extended: false }));

app.use(productRoutes);
sequelize.sync().then(() => {
  app.listen(3000);
});
