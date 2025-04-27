const express = require("express");
const router = express.Router();
const joi = require("joi");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const User = require("../models/User");

const recipeSchema = joi.object({
  title: joi.string().trim().max(50).required(),
  ingredients: joi.array().items(joi.string().trim()).min(2).required(),
  instructions: joi.array().items(joi.string().trim()).min(1).required(),
  image: joi.string().trim().uri().allow("").optional(),
  dairyMeatType: joi.string().valid("בשרי", "חלבי", "פרווה").required(),
  mealType: joi.array().items(joi.string().trim().min(3)),
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send("Recipe not found");
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    if (!recipes) return res.status(404).send("No recipes found");
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/liked/:userId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    const recipes = await Recipe.find({ _id: { $in: user.likes } });
    if (!recipes) return res.status(404).send("No recipes found");

    res.send(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = recipeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const recipeExists = await Recipe.findOne({
      title: req.body.title,
    });
    if (recipeExists) return res.status(400).send("Recipe already exists");

    const recipe = new Recipe({
      ...req.body,
      userId: req.payload._id,
    });

    await recipe.save();
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:recipeId", auth, async (req, res) => {
  try {
    const { error } = recipeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!recipe) return res.status(404).send("Recipe not found");
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:recipeId", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!recipe) return res.status(404).send("Recipe not found");
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/like/:recipeId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(404).send("User not found");

    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send("Recipe not found");

    if (!recipe.likes.includes(req.payload._id)) {
      recipe.likes.push(req.payload._id);
      await recipe.save();
      res.status(200).send("לייק נוסף בהצלחה");
    } else {
      recipe.likes = recipe.likes.filter((id) => id !== req.payload._id);
      await recipe.save();
      res.status(200).send("לייק הוסר בהצלחה");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
