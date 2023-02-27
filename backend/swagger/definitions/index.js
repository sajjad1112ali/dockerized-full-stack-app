const auth = require("./login/auth");
const register = require("./login/register");
const authResponse = require("./login/authResponse");
const user = require("./login/user");
const addBlog = require("./blog/addBlog");
const getBlogs = require("./blog/getBlogs");
const blogItems = require("./blog/blogItems");
const badRequest = require("./responses/badRequest");
const addBlogResponse = require("./blog/addBlogResponse");
const deleteBlog = require("./blog/deleteBlog");

module.exports = {
  ...register,
  ...auth,
  ...addBlog,
  ...getBlogs,
  ...blogItems,
  ...authResponse,
  ...user,
  ...badRequest,
  ...addBlogResponse,
  ...deleteBlog,
};
