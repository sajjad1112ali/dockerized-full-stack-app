const deleteBlog = require("./deleteBlog");
const getSingleBlog = require("./getSingleBlog");
const { gerErrorObj } = require("../errorResponses");

module.exports = {
  "/blogs/{_id}": {
    ...getSingleBlog,
    put: {
      summary: "Edit Blog",
      description: "This API will be used for editing a blog",
      produces: ["application/json"],
      tags: ["Blog"],
      parameters: [
        {
          name: "_id",
          in: "path",
          description: "The '_id' of blog you want to update",
          default: "62fd0b060d7462f70c784ecb",
        },
        {
          name: "Blog",
          in: "body",
          description: "Blog data",
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
    ...deleteBlog,
  },
};
