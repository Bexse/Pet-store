const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

const SECRET_KEY = "furever";

exports.getAllUsers = async (req, res) => {
  const documents = await User.find({});
  res.send(documents);
};

exports.login = async (req, res) => {
  const { password } = req.body;

  // Check for user email
  const user = await User.findOne({ email: req.body.email }).lean();
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    const token = jwt.sign({ ...user, password: null }, SECRET_KEY);
    return res.json({ success: true, data: token });
  }

  res.json({ sucess: false });
};

exports.signUp = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email | !password | !role) {
    res.status(400);
    throw new Error("please add all fields!");
  }
  // check if the users  exist or not.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.json({ success: true, data: user });
};

exports.middleware = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead) return res.status(401).json({ message: "no token found" });

  try {
    const token = authHead.split(" ")[1];
    let user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
};

exports.roleAuth = async (req, res, next) => {
  if (req.user.role === "breeder") {
    next();
  } else {
    res.send("Request is not authorized!");
  }
};








