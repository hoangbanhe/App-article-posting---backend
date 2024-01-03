const express = require("express");
const {
  viewProductFunc,
  purchaseProductFunc,
  insertManyToProduct,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.route("/view-product").get(viewProductFunc);
productRouter.route("/purchase-product").put(purchaseProductFunc);
productRouter.route("/insertmany-product").post(insertManyToProduct);

module.exports = {
  productRouter,
};
