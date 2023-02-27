const functions = require("../global/functions");
module.exports = function (err, req, res, next) {
  console.log("--------------------");
  res.status(500).send(functions.getResponse(0, "internalServerError", []));
};
