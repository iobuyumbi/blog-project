const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// Public routes
router.get("/", getAllPosts);
router.get("/:idOrSlug", getPost);

// Private routes (Admin only ideally)
router.post("/", createPost);
router.put("/:idOrSlug", updatePost);
router.delete("/:idOrSlug", deletePost);

module.exports = router;
