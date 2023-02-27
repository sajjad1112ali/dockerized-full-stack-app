const functions = require("../../utils/functions");

const blogModel = {
  title: {
    type: "string",
    default: "Some Title",
    required: true,
  },
  description: {
    type: "string",
    default: "Some random description about the blog you want to save",
    required: true,
  },
  image_url: {
    type: "string",
    default:
      "https://www.pickshop.pk/wp-content/uploads/2018/02/Custom-Name-T-Shirt-By-Teez-Mar-Khan-Pickshop.Pk_-700x848.jpg",
    required: true,
  },
  is_featured: {
    type: "boolean",
    default: false,
    required: true,
  },
};

const blogExtras = {
  is_deleted: {
    type: "boolean",
  },
  _id: {
    type: "string",
  },
  user_id: {
    type: "string",
  },
  __v: {
    type: "integer",
  },
};

const getBlogModel = (forAdd = true) => {
  if (forAdd) {
    return { ...blogModel };
  }
  const removedDefaults = functions.removeDefaults(JSON.stringify(blogModel));
  return { ...removedDefaults, ...blogExtras };
};
module.exports = { getBlogModel };
