// Express instance
const express = require("express");

// Express Router
const router = express.Router();

// Mongoose instance
const mongoose = require("mongoose");

// BCrypt
const bcrypt = require("bcrypt");

// JWT
const jwt = require("jsonwebtoken");

// User instance
const User = require("../models/user");
const user = require("../models/user");

// hashing function.
async function hashPassword(password) {
  return await bcrypt
    .hash(password, 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      console.log("BCrypt Error:\n", err);
      throw Exception(err);
    });
}

// Compare hash
async function compareHash(plainTextPw, password) {
  return await bcrypt
    .compare(plainTextPw, password)
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return false;
    });
}

// Create new User
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (user.length >= 1) {
        console.log("User from DB:\n", user);
        return res.status(409).json({
          message: "User with this email already exists!",
        });
      } else {
        const pw = await hashPassword(req.body.password);
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: pw,
        });
        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "User created successfully!",
            });
          })
          .catch((err) => {
            // console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (user.length < 1) {
        console.log("No user found!");
        return res.status(401).json({
          message: "Authentication Failed!",
        });
      }
      const pwMatch = await compareHash(req.body.password, user[0].password);
      if (pwMatch) {
        console.log("Password Matched.");
        const token = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_Key,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: "User successfully logged in.",
          token: token,
        });
      }
      console.log("Wrong Password.");
      res.status(401).json({
        message: "Authentication Failed!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((_) => {
      res.status(200).json({
        message: "User Deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
