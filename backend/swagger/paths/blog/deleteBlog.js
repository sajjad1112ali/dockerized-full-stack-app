const { gerErrorObj } = require("../errorResponses");
module.exports = {
  delete: {
    summary: "Delete Blog",
    description: "This API will be used for delete a blog",
    produces: ["application/json"],
    tags: ["Blog"],
    parameters: [
      {
        name: "_id",
        in: "path",
        description: "The '_id' of blog you want to update",
        default: "62fd0b060d7462f70c784ecb",
      },
    ],
    responses: {
      200: {
        description: "successful operation",
        schema: {
          $ref: "#/definitions/deleteBlog",
        },
      },
      ...gerErrorObj(true),
    },
  },
};
