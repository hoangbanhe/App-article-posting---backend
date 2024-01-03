const { Tag } = require("../database/sequelize");
const { faker } = require("@faker-js/faker");

const createTag = async (req, res, next) => {
  try {
    const { tagName } = req.body;

    const newTag = await Tag.create({
      tagName,
    });
    return res.json({
      data: { newTag },
      message: "Create tag is successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getOneTag = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const getAllTags = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const deleteOneTag = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const createRandomTags = () => {
  return {
    tagName: faker.vehicle.type(),
  };
};

const fakeTagsData = async (req, res, next) => {
  try {
    for (let index = 0; index < 20; index++) {
      await Tag.create({
        ...createRandomTags(),
      });
    }
    return res.json({
      message: "Create fake tags data success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTag,
  getOneTag,
  getAllTags,
  updateTag,
  deleteOneTag,
  fakeTagsData,
};
