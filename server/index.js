const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

const user = require("./routes/user");
const recipe = require("./routes/recipe");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", user);
app.use("/api/recipe", recipe);

app.listen(port, () => console.log(`Server is running on port ${port}`));
