const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
  search,
  fakeTutorialsData,
  pagination,
} = require("../controllers/tutorial.controller");
const {
  checkLoginMiddleware,
} = require("../middlewares/check-login.middleware");

const tutorialRoute = express.Router();

tutorialRoute.route("/fake-data/create-tutorials").get(fakeTutorialsData);
tutorialRoute.route("/").get(getAll);
tutorialRoute.route("/pagination").get([checkLoginMiddleware], pagination);
tutorialRoute.route("/search").get(search);
tutorialRoute.route("/:id").get(getOne);
tutorialRoute.route("/").post([checkLoginMiddleware], create);
tutorialRoute.route("/:id").put(update);
tutorialRoute.route("/:id").delete(deleteOne);
tutorialRoute.route("/").delete(deleteAll);

module.exports = {
  tutorialRoute,
};
