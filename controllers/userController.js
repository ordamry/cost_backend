/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const moment = require('moment');

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      birthday: user.birthday,
      role: user.role,
      userToken: generateToken(user._id),
    });
  } else {
    res.status(401).send("Invalid Email or Password!");
  }
};

//register user
const register = async (req, res) => {
  const { first_name, last_name, email, birthday, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400).send("The user already exists");
  }
  const userData = {
    first_name: first_name,
    last_name: last_name,
    birthday: birthday,
    email: email,
    password: password,
    role: "user",
  }

  const user = await User.create(userData);

  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      birthday: user.birthday,
      role: user.role,
    });
  } else {
    res.status(400).send("Invalid user data");
  }
};

// all users data get
const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" }, { password: 0, __v: 0 });
  res.status(200).send(users);
};

// delete user data
const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    await User.deleteOne({ _id: user_id });

    res.send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// get one user data
const getOneUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.find({ id: user_id });
    const resData = {
      id: user[0].id,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      birthday: moment(user[0].birthday).format("MMMM DD, YYYY"),
      email: user[0].email,
      role: user[0].role,
    }
    
    res.status(200).send(resData);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// update user data
const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, email, birthday } = req.body;
  try {
    const userExist = await User.findById({ _id: user_id });
    userExist.first_name = first_name;
    userExist.last_name = last_name;
    userExist.email = email;
    userExist.birthday = birthday;
    userExist.updateAt = Date.now();
    await userExist.save();

    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

//update Profile
// update user data
const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { first_name, last_name, email, birthday } = req.body;
  try {
    const profileExist = await User.findById({ _id: _id });
    profileExist.first_name = first_name;
    profileExist.last_name = last_name;
    profileExist.email = email;
    profileExist.birthday = birthday;
    profileExist.updateAt = Date.now();
    await profileExist.save();

    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: moment(user.birthday).format("MMMM DD, YYYY"),
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

module.exports = {
  login,
  register,
  getUsers,
  deleteUser,
  getOneUser,
  updateUser,
  updateProfile,
  getUserProfile,
};
