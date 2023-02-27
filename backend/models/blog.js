const Joi = require("joi");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
Joi.objectId = require("joi-objectid")(Joi);

const blogSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  image_url: {
    type: String,
    required: true,
    minlength: 5,
  },
  is_featured: {
    type: Boolean,
    required: false,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
blogSchema.methods.costFormater = function () {
  return this.cost;
};
blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema);

function validateBlog(blog) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(1000).required(),
    image_url: Joi.string().min(5).required(),
    is_featured: Joi.boolean().default(true),
  };
  return Joi.validate(blog, schema);
}

exports.Blog = Blog;
exports.validate = validateBlog;
