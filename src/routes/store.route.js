const express = require('express');
const { saleProductFunc, analysisFunc, insertDataToStore, insertDatasToStore } = require('../controllers/store.controller');

const storeRouter = express.Router();

storeRouter.route("/sale-product").post(saleProductFunc);
storeRouter.route("/analysis").delete(analysisFunc);

storeRouter.route("/insertData").get(insertDataToStore)
storeRouter.route("/insertDatas").get(insertDatasToStore)


module.exports = {
    storeRouter,
}