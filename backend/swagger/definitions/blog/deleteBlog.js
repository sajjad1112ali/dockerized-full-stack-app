const commonResponseKeys = require("../commonSuccessResponseKeys");
module.exports = {
  deleteBlog: {
    type: "object",
    properties: {
      ...commonResponseKeys,
      data: {
        type: "object",
        properties: {},
      },
    },
  },
};
