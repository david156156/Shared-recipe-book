import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import AddRecipe from "./components/AddRecipe";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { UserProvider } from "./context/userContext";
import Register from "./components/Register";
import { RecipesProvider } from "./context/recipeContext";
import RecipeDetails from "./components/RecipeDetails";
import Footer from "./components/Footer";
import About from "./components/About";
import RecipesILiked from "./components/RecipesILiked";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <RecipesProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes-I-liked" element={<RecipesILiked />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/recipeDetails/:recipeId"
                element={<RecipeDetails />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </RecipesProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
