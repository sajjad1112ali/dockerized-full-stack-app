module.exports = {
  auth: {
    type: "object",
    properties: {
      email: {
        type: "string",
        default: "sajjadramzan1211@gmail.com",
        required: true,
      },
      password: {
        type: "string",
        default: "Sajjad@1",
        required: true,
      },
    },
  },
};
