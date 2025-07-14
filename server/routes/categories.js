const express = require("express");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Public routes
router.get("/", getAllCategories);
router.get("/:idOrSlug", getCategory);

// Private routes (Admin only ideally)
// Admin-only routes
router.post("/", protect, restrictTo("admin"), createCategory);
router.put("/:idOrSlug", protect, restrictTo("admin"), updateCategory);
router.delete("/:idOrSlug", protect, restrictTo("admin"), deleteCategory);

module.exports = router;
