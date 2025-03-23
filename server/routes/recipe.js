const express = require("express");
const router = express.Router();
const joi = require("joi");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const User = require("../models/User");

const recipeSchema = joi.object({
  title: joi.string().required(),
  ingredients: joi.array().items(joi.string()).required(),
  instructions: joi.array().items(joi.string()).required(),
  image: joi.string(),
  category: joi.array().items(joi.string()).required(),
});

//get all recipes
//get recipe by ID
//add recipe
//update recipe
//delete recipe

//דירוג מתכון (לייק/דיסלייק)
//הסרת דירוג

//get recipe by userId

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

//add recipe
router.post("/", auth, async (req, res) => {
  try {
    const { error } = recipeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.title == recipe.title)
      return res.status(400).send("Recipe already exists");

    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      image: req.body.image,
      category: req.body.category,
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
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: req.body.image,
        category: req.body.category,
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

router.patch("/:recipeId/like", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");

    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send("Recipe not found");

    if (!user.likes.includes(req.params.recipeId)) {
      user.likes.push(req.params.recipeId);
      await user.save();
      recipe.likes++;
      await recipe.save();
      res.status(200).send("לייק נוסף בהצלחה");
    } else {
      user.likes = user.likes.filter((id) => id !== req.params.recipeId);
      await user.save();
      recipe.likes--;
      await recipe.save();
      res.status(200).send("לייק הוסר בהצלחה");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
