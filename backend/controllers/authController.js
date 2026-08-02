const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function toSafeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

// @route POST /api/auth/register
// @desc  Register a new user (role is always "user" here — admins are seeded separately)
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role: "user" });
    const token = signToken(user);

    return res.status(201).json({ token, user: toSafeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
}

// @route POST /api/auth/login
// @desc  Log in an existing user or admin
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);
    return res.status(200).json({ token, user: toSafeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
}

// @route GET /api/auth/me
// @desc  Return the currently authenticated user (requires "protect" middleware)
async function getMe(req, res) {
  return res.status(200).json({ user: toSafeUser(req.user) });
}

module.exports = { register, login, getMe };
