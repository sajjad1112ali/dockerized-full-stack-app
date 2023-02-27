const errorObj = {
  400: {
    description: "Bad request",
    schema: {
      $ref: "#/definitions/badRequest",
    },
  },
  404: {
    description: "Not found",
    schema: {
      $ref: "#/definitions/badRequest",
    },
  },
  500: {
    description: "Server error",
    schema: {
      $ref: "#/definitions/badRequest",
    },
  },
  401: {
    description: "Un authorized",
    schema: {
      $ref: "#/definitions/badRequest",
    },
  },
};

const gerErrorObj = (isProtected) => {
  if (!isProtected) {
    const copy = { ...errorObj };
    delete copy[401];
    return copy;
  }
  return errorObj;
};
module.exports = { gerErrorObj };
