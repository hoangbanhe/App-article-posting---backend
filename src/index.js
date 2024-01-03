const express = require("express");
const bodyParser = require("body-parser");

const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { storeRouter } = require("./routes/store.route");
const { sequelize } = require("./database/sequelize");
const { tutorialRoute } = require("./routes/tutorial.route");
const cors = require("cors");
const {
  loggerErrorMiddleware,
  errorResponseMiddleware,
} = require("./middlewares/handle-error.middleware");
const { tagRouter } = require("./routes/tag.route");

console.log("Connect to database success");

const app = express();
const port = 3000;

const corOptions = {
  origin: "http://localhost:3001",
};

// Cho phép gửi biến từ body -> NodeJS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/store", storeRouter);
app.use("/api/tutorials", tutorialRoute);
app.use("/api/tags",tagRouter);

app.use(loggerErrorMiddleware);
app.use(errorResponseMiddleware);

app.post("/viewBody", (req, res) => {
  res.send(req.body);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been establinshed successfully");
  })
  .catch((err) => {
    console.error("unable to connect to the database");
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
