const jwt = require("jsonwebtoken");

// @desc Generate JWT Token
// @param {Object} user - User object
// @returns {String} - JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d", // fallback
  });
};

module.exports = { generateToken };
