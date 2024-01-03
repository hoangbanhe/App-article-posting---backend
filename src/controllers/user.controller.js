const bcrypt = require("bcrypt");
const { faker, ne } = require("@faker-js/faker");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User, Tutorial } = require("../database/sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // đọc tài liệu xử lý chỗ này
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const { password: anotherPassword, ...result } = newUser.get({
      plain: true,
    });

    return res.json({
      data: {
        result,
      },
      message: "Create user success",
    });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const currUser = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!currUser) {
      throw Error("User with email not exist");
    }

    const isValidPassword = bcrypt.compareSync(password, currUser.password);

    if (!isValidPassword) {
      throw Error("Password is not match");
    }

    const accessToken = jwt.sign(
      {
        id: currUser.id,
        email: currUser.email,
      },
      "secret_key",
      { expiresIn: "30m" }
    );

    return res.json({
      accessToken,
      avatar: currUser.avatar,
      message: "Login Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const createRandomUser = () => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("123123", salt);
  return {
    avatar: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `${faker.finance.pin()}${faker.internet.email()}`,
    password: hash,
    role: "user",
  };
};

const fakeDataUser = async (req, res, next) => {
  try {
    for (let index = 0; index < 50; index++) {
      await User.create({
        ...createRandomUser(),
      });
    }
    return res.json({
      message: "fake user success",
    });
  } catch (error) {
    return next(error);
  }
};

const getUserProfileAPI = async (req, res, next) => {
  try {
    const isLoginUser = await getUserFromToken(req, res, next);
    if (!isLoginUser) {
      throw new Error("User not found");
    }
    const currUser = await User.findOne({
      where: {
        email: isLoginUser.email,
      },
      include: {
        model: Tutorial,
        as: "Tutorial",
      },
    });
    return res.json({
      data: {
        currUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getUserListAPI = async (req, res, next) => {
  try {
    const isLoginedUser = await getUserFromToken(req, res, next);
    if (!isLoginedUser) {
      throw new Error("User not found");
    }
    const allUsers = await User.findAll({
      where: {
        role: "user",
      },
      include: {
        model: Tutorial,
        as: "Tutorial",
      },
    });
    return res.json({
      data: {
        allUsers,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signIn,
  createUser,
  fakeDataUser,
  getUserProfileAPI,
  getUserListAPI,
};
