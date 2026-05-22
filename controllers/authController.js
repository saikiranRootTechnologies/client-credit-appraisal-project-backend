const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    employee_code: user.employee_code,
    role: user.role,
  };
}

exports.signup = async (req, res) => {
  const { email, password, full_name, employee_code, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  if (password.length < 6) return res.status(400).json({ message: "password must be at least 6 chars" });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password_hash,
    full_name: full_name || null,
    employee_code: employee_code || null,
    role: role || "analyst",
  });

  const token = signToken(user);
 return res.status(201).json({ token, user: publicUser(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
};

exports.me = async (req, res) => {
  return res.json({ user: publicUser(req.user) });
};
