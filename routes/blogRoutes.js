const express = require("express");
const blogController = require('../controllers/blogController')
const router = express.Router();

// these are the blog routes
router.get("/", blogController.blog_index);
// render create page
router.get("/create", blogController.blog_create_get);
// route parameters
router.get("/:id", blogController.blog_details);
// create new blog
router.post("/", blogController.blog_create_post);
// delete blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
