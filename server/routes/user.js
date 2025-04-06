const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const registerSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)
    .message("הסיסמה חייבת להכיל לפחות אות אחת, מספר אחד ותו מיוחד")
    .required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)
    .message("הסיסמה חייבת להכיל לפחות אות אחת, מספר אחד ותו מיוחד")
    .required(),
});

router.post("/register", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({
      email: req.body.email,
    });
    if (userExists) return res.status(400).send("המייל כבר קיים במערכת");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
    });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET
    );
    res.send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("האימייל או הסיסמה אינם נכונים");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send("האימייל או הסיסמה אינם נכונים");

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET
    );
    res.send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name");
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select({
      password: 0,
      __v: 0,
    });
    if (!user) return res.status(404).send("משתמש לא נמצא");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user profile
router.put("/me", auth, async (req, res) => {
  try {
    const updateSchema = joi.object({
      firstName: joi.string(),
      lastName: joi.string(),
      profilePic: joi.string(),
    });

    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select("-password");

    res.send("העידכון בוצע בהצלחה");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user account
router.delete("/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.send("החשבון נמחק בהצלחה");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user by ID (Admin only)
router.delete("/:userId", auth, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user._id);
    if (!requestingUser || !requestingUser.isAdmin) {
      return res.status(403).send("אין לך הרשאות למחוק משתמשים");
    }

    if (req.params.userId === req.user._id.toString()) {
      return res.status(400).send("לא ניתן למחוק את חשבון המנהל");
    }

    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).send("משתמש לא נמצא");
    }

    res.send(`המשתמש ${user.firstName} ${user.lastName} נמחק בהצלחה`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
