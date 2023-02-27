const blogController = require("../controllers/blog.controller");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", blogController.getBlogs);
router.post("/add", auth, blogController.addBlog);
router.put("/:id", auth, blogController.updateBlog);
router.delete("/:id", auth, blogController.deleteBlog);
router.get("/:id", blogController.getSingleBlog);

module.exports = router;
