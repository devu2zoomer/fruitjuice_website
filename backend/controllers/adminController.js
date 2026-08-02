const User = require("../models/User");
const Product = require("../models/Product");
const Contact = require("../models/Contact");

// @route GET /api/admin/dashboard
// @desc  Summary stats shown on the admin dashboard
async function getDashboardStats(req, res) {
  try {
    const [
      totalUsers,
      totalAdmins,
      recentUsers,
      totalProducts,
      activeProducts,
      totalContacts,
      newContacts,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "admin" }),
      User.find().sort({ createdAt: -1 }).limit(5).select("name email role createdAt"),
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
    ]);

    return res.status(200).json({
      totalUsers,
      totalAdmins,
      totalAccounts: totalUsers + totalAdmins,
      totalProducts,
      activeProducts,
      totalContacts,
      newContacts,
      recentUsers,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load dashboard stats", error: err.message });
  }
}

// @route GET /api/admin/users
// @desc  Paginated list of all users, newest first
async function getUsers(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

    const [users, total] = await Promise.all([
      User.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("name email role createdAt"),
      User.countDocuments(),
    ]);

    return res.status(200).json({
      users,
      page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load users", error: err.message });
  }
}

module.exports = { getDashboardStats, getUsers };
