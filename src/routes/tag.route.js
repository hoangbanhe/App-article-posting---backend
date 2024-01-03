const express = require("express");
const {
  createTag,
  getOneTag,
  getAllTags,
  updateTag,
  deleteOneTag,
  fakeTagsData,
} = require("../controllers/tag.controller");

const tagRouter = express.Router();

tagRouter.route("/fake-tag-data").get(fakeTagsData);

tagRouter.route("/").post(createTag);

tagRouter.route("/:id").get(getOneTag);

tagRouter.route("/").get(getAllTags);

tagRouter.route("/:id").put(updateTag);

tagRouter.route("/:id").delete(deleteOneTag);

module.exports = {
  tagRouter,
};
