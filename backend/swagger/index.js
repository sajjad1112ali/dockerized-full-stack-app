const paths = require("./paths");
const definitions = require("./definitions");

module.exports = {
  swagger: "2.0",
  info: {
    description:
      "This is a simple example NodeJS API project to demonstrate Swagger Documentation",
    version: "1.0.0",
    title: "Sample API Documentation",
    contact: {
      email: "sajjadramzan1211@gmail.com",
    },
    license: {},
  },
  schemes: ["http"],
  host: "localhost:3010",
  basePath: "/api",
  paths,
  definitions,
  securityDefinitions: {
    token: {
      name: "x-auth-token",
      in: "header",
      type: "apiKey",
      description: "JWT Authorization header",
    },
  },
  security: [
    {
      token: [],
    },
  ],
};
