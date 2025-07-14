const Post = require("../models/Post");

// @desc Get all posts
// @route GET /api/posts
// @access Public
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get a single post by ID or slug
// @route GET /api/posts/:idOrSlug
exports.getPost = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const post = await Post.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    })
      .populate("author", "name")
      .populate("category", "name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create a new post
// @route POST /api/posts
// @access Private
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category, excerpt, tags, isPublished } = req.body;

    const newPost = await Post.create({
      title,
      content,
      category,
      excerpt,
      tags,
      isPublished,
      author: req.user.id, // From authentication middleware
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private

exports.updatePost = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    const post = await Post.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Optional: Check if the current user is the post's author or an admin
    // if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return res.status(403).json({ success: false, message: "Not authorized" });
    // }

    // Update fields manually (controlled)
    const fieldsToUpdate = [
      "title",
      "content",
      "excerpt",
      "category",
      "tags",
      "isPublished",
      "featuredImage",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        post[field] = req.body[field];
      }
    });

    // Save — will trigger the `pre('save')` hook and re-generate slug if title is modified
    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private (author or admin)

exports.deletePost = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    const post = await Post.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Optional auth check (if using authentication middleware)
    // if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Not authorized to delete this post",
    //   });
    // }

    // ✅ Delete using recommended method
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
