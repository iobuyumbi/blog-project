const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post"); // ✅ Needed for isPostAuthor

// ✅ Middleware: Protect routes (requires valid JWT)
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next(); // ✅ Authenticated, proceed
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

// ✅ Middleware: Allow only admin access
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only [${roles.join(
          ", "
        )}] can access this route.`,
      });
    }
    next();
  };
};

// ✅ Middleware: Allow only the post author or an admin
exports.isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      $or: [{ _id: req.params.idOrSlug }, { slug: req.params.idOrSlug }],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isAuthor = post.author.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to perform this action",
      });
    }

    next(); // ✅ Allowed: either author or admin
  } catch (error) {
    next(error);
  }
};
