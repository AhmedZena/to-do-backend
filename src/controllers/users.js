/*
const express = require("express");
const router = express.Router();


const {
  register,
  getUsers,
  deleteUser,
  editUser,
  getUserTodos,
} = require("../controllers/users");


router.route("/").post(register).get(getUsers);
router.route("/:id").delete(deleteUser).patch(editUser);
router.route("/:userId/todos").get(getUserTodos);
*/

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

const register = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ message: "user was created successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "user was not created", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }
    let user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "user was not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    let payload = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    let token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "user was logged in successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "user was not logged in", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "users were not found", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (deletedUser) {
      return res
        .status(200)
        .json({ message: "user was deleted successfully", deletedUser });
    }
    res.status(404).json({ message: "user was not found" });
  } catch (error) {
    res.status(500).json({ message: "user was not deleted", error });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;
    // const updatedUser = await UserModel.findByIdAndUpdate(id, body);

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, body, {
      runValidators: true,
    });

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "user was updated successfully", updatedUser });
    }
    res.status(404).json({ message: "user was not found" });
  } catch (error) {
    res.status(500).json({ message: "user was not updated", error });
  }
};

module.exports = {
  register,
  getUsers,
  deleteUser,
  editUser,
  login,
};
