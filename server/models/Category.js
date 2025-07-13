const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
      maxlength: [50, "Category name cannot be more than 50 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
