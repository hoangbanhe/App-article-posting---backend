const { connection } = require("../database/connect");

const viewProductFunc = (req, res, next) => {
  console.log("view product func is running");
};

const purchaseProductFunc = (req, res, next) => {
  console.log("Purchase product func is running");
};

const insertManyToProduct = (req, res, next) => {
  const { name, description, information } = req.body;
  const insertManyToProduct = `INSERT INTO products(name,description,information) VALUES ?`;
  const products = [
    {
      name: `${name}`,
      description: `${description}`,
      information: `${information}`,
    },
  ];
  const values = products.map((product) => [
    product.name,
    product.description,
    product.information,
  ]);

  connection.query(insertManyToProduct, [values], (err, result) => {
    if (err) throw err;
    return res.json({
      massage: "insert data in product success",
    });
  });
};

module.exports = {
  viewProductFunc,
  purchaseProductFunc,
  insertManyToProduct,
};
