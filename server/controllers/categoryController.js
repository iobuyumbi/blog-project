// server/controllers/categoryController.js

const Category = require("../models/Category");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single category by ID or slug
// @route   GET /api/categories/:idOrSlug
// @access  Public
exports.getCategory = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    const category = await Category.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (Admin only ideally)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category with that name already exists",
      });
    }

    const category = new Category({ name, description });
    const saved = await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:idOrSlug
// @access  Private (Admin)
exports.updateCategory = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const { name, description } = req.body;

    const category = await Category.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name) category.name = name;
    if (description) category.description = description;

    const updated = await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:idOrSlug
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    const category = await Category.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
