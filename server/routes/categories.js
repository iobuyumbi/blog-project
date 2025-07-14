const express = require("express");
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
router.post("/", createCategory);
router.put("/:idOrSlug", updateCategory);
router.delete("/:idOrSlug", deleteCategory);

module.exports = router;
