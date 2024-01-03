const { connection } = require("../database/connect");

const saleProductFunc = (req, res, next) => {
  console.log("Sale product is running");
};

const analysisFunc = (req, res, next) => {
  console.log("Analysis function is running");
};

const insertDataToStore = (req, res, next) => {
  const insertDataSQL = `INSERT INTO stores (name, address) VALUES ('Gear sneaker', 'Da Nang')`;
  connection.query(insertDataSQL, function (err, result) {
    if (err) throw err;

    return res.json({
      message: "Insert data to store table success",
    });
  });
};

const insertDatasToStore = (req, res, next) => {
  const insertManySQL = `INSERT INTO stores (name, address) VALUES ?`;

  const stores = [
    {
      name: "john_doe",
      address: "john.doe@example.com",
    },
    {
      name: "jane_smith",
      address: "jane.smith@example.com",
    },
    {
      name: "jane_smith",
      address: "jane.smith@example.com",
    },
    {
      name: "jane_smith",
      address: "jane.smith@example.com",
    },
  ];

  const values = stores.map((store) => [store.name, store.address]);

  connection.query(insertManySQL, [values], function (err, results) {
    if (err) {
      console.log("something error");
    }

    return res.json({
      message: "insert many data to table stores success",
    })
  });
};

module.exports = {
  saleProductFunc,
  analysisFunc,
  insertDataToStore,
  insertDatasToStore,
};
