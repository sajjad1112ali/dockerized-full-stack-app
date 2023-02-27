/* eslint-disable camelcase */
const httpStatus = require("http-status");
const catchAsync = require("../global/catchAsync");

const { Blog, validate } = require("../models/blog");
const functions = require("../global/functions");
const { OBJECT, ARRAY, BLOG } = functions.defaultData;
const { successVars, failureVars } = functions;
const _ = require("lodash");

const findAndUpdateBlog = async (req, cols) =>
  Blog.findOneAndUpdate(
    { _id: req.params.id, is_deleted: false },
    _.pick(req.body, cols),
    {
      new: true,
    }
  );

const getBlogs = catchAsync(async (req, res) => {
  let searchObj = {};
  let options = {};
  let { MSG_KEY, STATUS } = failureVars("NOT_FOUND");
  if (Object.keys(req.query).length !== 0) {
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    options = {
      limit,
      page,
    };
  }
  let blogs = await Blog.paginate({ is_deleted: false }, options);
  if (blogs && blogs.docs.length > 0) {
    ({ MSG_KEY, STATUS } = successVars("FOUND"));
  }
  res
    .status(httpStatus.OK)
    .send(functions.getResponse(STATUS, MSG_KEY, blogs, BLOG));
});

const addBlog = catchAsync(async (req, res) => {
  const { error } = validate(req.body);
  const { _id } = req.user;
  let MSG_KEY, STATUS;

  if (error) {
    ({ MSG_KEY, STATUS } = failureVars(""));
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(functions.getResponse(STATUS, error.details[0].message, OBJECT));
  }

  let blog = new Blog(
    _.pick(req.body, ["title", "description", "image_url", "is_featured"])
  );
  blog.user_id = _id;
  blog = await blog.save();
  ({ MSG_KEY, STATUS } = successVars("SAVED"));

  res
    .status(httpStatus.OK)
    .send(functions.getResponse(STATUS, MSG_KEY, blog, BLOG));
});

const updateBlog = catchAsync(async (req, res) => {
  let MSG_KEY, STATUS;

  const { error } = validate(req.body);
  if (error) {
    ({ MSG_KEY, STATUS } = failureVars(""));

    return res
      .status(httpStatus.BAD_REQUEST)
      .send(
        functions.getResponse(STATUS, error.details[0].message, OBJECT, BLOG)
      );
  }

  const blog = await findAndUpdateBlog(req, [
    "title",
    "description",
    "image_url",
  ]);

  if (!blog) {
    ({ MSG_KEY, STATUS } = failureVars("NOT_FOUND"));

    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT, BLOG));
  }
  ({ MSG_KEY, STATUS } = successVars("UPDATED"));
  res
    .status(httpStatus.OK)
    .send(functions.getResponse(STATUS, MSG_KEY, blog, BLOG));
});

const deleteBlog = catchAsync(async (req, res) => {
  let HTTP_STATUS, MSG_KEY, STATUS;

  req.body.is_deleted = true;
  const blog = await findAndUpdateBlog(req, ["is_deleted"]);
  if (!blog) {
    ({ MSG_KEY, STATUS } = failureVars("NOT_FOUND"));
    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT, BLOG));
  }
  ({ MSG_KEY, STATUS } = successVars("DELETED"));

  res.status(200).send(functions.getResponse(STATUS, MSG_KEY, OBJECT, BLOG));
});

const getSingleBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    ({ MSG_KEY, STATUS } = failureVars("NOT_FOUND"));
    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT, BLOG));
  }
  ({ MSG_KEY, STATUS } = successVars("FOUND"));

  res.status(200).send(functions.getResponse(STATUS, MSG_KEY, blog, BLOG));
});

module.exports = {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
