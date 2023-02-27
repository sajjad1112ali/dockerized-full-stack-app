const { gerErrorObj } = require("../errorResponses");
module.exports = {
  "/blogs/add": {
    post: {
      summary: "Add Blog",
      description: "End point for adding a new blog",
      produces: ["application/json"],
      tags: ["Blog"],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "body object",
          schema: {
            $ref: "#/definitions/addBlog",
          },
        },
      ],
      responses: {
        200: {
          description: "successful operation",
          schema: {
            $ref: "#/definitions/addBlogResponse",
          },
        },
        ...gerErrorObj(true),
      },
    },
  },
};
