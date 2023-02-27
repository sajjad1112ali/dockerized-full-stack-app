module.exports = {
  register: {
    type: "object",
    properties: {
      name: {
        type: "string",
        default: "John wick",
        required: true,
      },
      email: {
        type: "string",
        default: "john.wick@gmail.com",
        required: true,
      },
      password: {
        type: "string",
        default: "john99wick",
        required: true,
      },
    },
  },
};
