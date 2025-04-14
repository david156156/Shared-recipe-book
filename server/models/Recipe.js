const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  dairyMeatType: {
    type: String,
    enum: ["בשרי", "חלבי", "פרווה"],
    required: true,
  },
  mealType: {
    type: [String],
  },
  likes: {
    type: [String],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("recipe", recipeSchema);
