const { getBlogModel } = require("./blogModel");
const commonResponseKeys = require("../commonSuccessResponseKeys");
module.exports = {
  blogItems: {
    type: "object",
    properties: {
      ...getBlogModel(false),
    },
  },
};
