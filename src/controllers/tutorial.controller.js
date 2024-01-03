const { Op } = require("sequelize");
const { faker } = require("@faker-js/faker");
const { Tutorial, User, Tag } = require("../database/sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const pagination = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const offset = (Number(page) - 1) * Number(perPage);
    const limit = +perPage;

    const allTutorials = await Tutorial.findAndCountAll({
      where: {},
      offset,
      limit,
    });
    const { count } = allTutorials;
    const totalPage = Math.ceil(count / perPage);

    return res.json({
      data: {
        totalPage,
        page,
        perPage,
        total: count,
        allTutorials: allTutorials.rows,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allTutorials = await Tutorial.findAll({
      include: {
        model: User,
        as: "User",
        attributes: ["firstName", "lastName", "email", "avatar"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({
      data: { allTutorials },
      message: "get all tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const search = req.query.search;
    console.log(
      "🚀 ~ file: tutorial.controller.js:110 ~ search ~ search:",
      search
    );

    const allTutorials = await Tutorial.findAll({
      where: {
        title: { [Op.like]: `%${search}%` },
      },
    });
    return res.json({
      data: {
        allTutorials,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currTutorial = await Tutorial.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!currTutorial) {
      throw Error("This tutorial is not found");
    }

    return res.json({
      data: {
        currTutorial,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, description, publicStatus, tagId } = req.body;
    const currUser = await getUserFromToken(req, res, next);

    const newTutorial = await Tutorial.create({
      title,
      description,
      publicStatus,
      UserId: currUser.id,
    });
    await addTagToTutorial(newTutorial, tagId);
    return res.json({
      data: {
        newTutorial,
      },
      message: "Create tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const addTagToTutorial = async (tutorialId, tagId) => {
  const currentTag = await Tag.findOne({
    where: {
      id: tagId,
    },
  });
  currentTag.addTutorial(tutorialId);
};

const update = async (req, res, next) => {
  try {
    const { title, description, publicStatus } = req.body;
    const { id } = req.params;
    const updateTutorial = await Tutorial.update(
      {
        title,
        description,
        publicStatus,
      },
      {
        where: {
          id: id,
        },
        raw: true,
      }
    );
    res.json({
      data: { updateTutorial },
      message: "update tutorial is success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteOneTutotial = await Tutorial.destroy({
      where: { id },
    });
    return res.json({
      data: { deleteOneTutotial },
      message: "delete one tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    await Tutorial.destroy({
      where: {},
    });
    return res.json({
      message: "Delete tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const createRandomTutorial = () => {
  return {
    title: faker.animal.bear(),
    description: faker.commerce.productDescription(),
    publicStatus: "public",
    image: faker.image.urlPicsumPhotos(),
    UserId: faker.number.int({
      min: 1,
      max: 50,
    }),
  };
};

const fakeTutorialsData = async (req, res, next) => {
  try {
    console.log("fake data done");
    for (let index = 0; index < 50; index++) {
      await Tutorial.create({
        ...createRandomTutorial(),
      });
    }
    return res.json({
      message: "Create fake tutorials data success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteAll,
  deleteOne,
  search,
  fakeTutorialsData,
  pagination,
};
