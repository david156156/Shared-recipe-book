import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { UserProvider } from "./context/userContext";
import Register from "./components/Register";
import { RecipesProvider } from "./context/recipeContext";
import RecipeDetails from "./components/RecipeDetails";
import Footer from "./components/Footer";
import About from "./components/About";
import RecipesILiked from "./components/RecipesILiked";
import MyBook from "./components/MyBook";

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
              <Route path="/recipes-I-liked" element={<RecipesILiked />} />
              <Route path="/my-book" element={<MyBook />} />
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
