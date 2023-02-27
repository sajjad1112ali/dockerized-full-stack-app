const commonResponseKeys = require("../commonSuccessResponseKeys");
module.exports = {
  getBlogs: {
    type: "object",
    properties: {
      ...commonResponseKeys,
      data: {
        type: "object",
        properties: {
          docs: {
            type: "array",
            items: {
              $ref: "#/definitions/blogItems",
            },
          },
          total: {
            type: "integer",
            default: 3,
          },
          limit: {
            type: "integer",
            default: 10,
          },
          offset: {
            type: "integer",
            default: 0,
          },
          page: {
            type: "integer",
            default: 1,
          },
          pages: {
            type: "integer",
            default: 1,
          },
        },
      },
    },
  },
};
