const express = require("express");
const {
  signIn,
  createUser,
  fakeDataUser,
  getUserProfileAPI,
  getUserListAPI,
} = require("../controllers/user.controller");
const { checkLoginMiddleware } = require("../middlewares/check-login.middleware");

const userRouter = express.Router();

userRouter.route("/sign-in").post(signIn);
userRouter.route("/create-user").post(createUser);
userRouter.route("/fake-data-user").get(fakeDataUser);
userRouter.route("/get-profile").get([checkLoginMiddleware],getUserProfileAPI);
userRouter.route("/users-list").get([checkLoginMiddleware],getUserListAPI);

module.exports = {
  userRouter,
};
