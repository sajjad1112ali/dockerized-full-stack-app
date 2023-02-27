const { getBlogModel } = require("./blogModel");
const commonResponseKeys = require("../commonSuccessResponseKeys");
module.exports = {
  addBlogResponse: {
    type: "object",
    properties: {
      ...commonResponseKeys,
      data: {
        type: "object",
        properties: {
          ...getBlogModel(false),
        },
      },
    },
  },
};
