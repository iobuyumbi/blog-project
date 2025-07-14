const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// Middleware to protect routes (authentication)
const {
  protect,
  restrictTo,
  isPostAuthor,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllPosts);
router.get("/:idOrSlug", getPost);

// Private routes (Admin only ideally)
// Protected routes (Logged-in users)
router.post("/", protect, createPost); // Any logged-in user can create a post

// Protected routes (Only author or admin can update/delete)
router.put("/:idOrSlug", protect, isPostAuthor, updatePost);
router.delete("/:idOrSlug", protect, isPostAuthor, deletePost);

module.exports = router;
