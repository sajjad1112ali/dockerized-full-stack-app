module.exports = {
  badRequest: {
    type: "object",
    properties: {
      status: {
        type: "integer",
        value: 1,
      },
      message: {
        type: "string",
        value: "Data successfully fetched",
      },
      data: {
        type: "object",
        properties: {},
      },
    },
  },
};
