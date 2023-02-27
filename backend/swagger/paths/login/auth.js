const { gerErrorObj } = require("../errorResponses");
module.exports = {
  "/user": {
    post: {
      summary: "Authorize",
      description: "Authorization",
      produces: ["application/json"],
      tags: ["User"],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "body object",
          schema: {
            $ref: "#/definitions/auth",
          },
        },
      ],
      responses: {
        200: {
          description: "successful operation",
          schema: {
            $ref: "#/definitions/authResponse",
          },
        },
        ...gerErrorObj(false),
      },
    },
  },
};
