const commonResponseKeys = require("../commonSuccessResponseKeys");
module.exports = {
  authResponse: {
    type: "object",
    properties: {
      ...commonResponseKeys,
      data: {
        type: "object",
        $ref: "#/definitions/user",
      },
    },
  },
};
