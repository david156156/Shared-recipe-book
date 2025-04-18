import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import AddRecipe from "./AddRecipe";
import { likeRecipe } from "../services/recipeService";
import { useRecipes } from "../context/recipeContext";

interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  dairyMeatType: string;
  mealType?: string[];
  likes?: string[];
}

const Home = () => {
  const { recipes, loading, handleRecipeClick, handleLikeRecipe } =
    useRecipes();
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="recipes-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>ברוכים הבאים לספר המתכונים המשותף</h1>
            <p>גלו מתכונים חדשים והוסיפו את המתכונים האהובים עליכם</p>
          </div>
        </section>

        <div className="main-content">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card">
              <img
                onClick={() => handleRecipeClick(recipe._id || "")}
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <div className="card-text-container">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.likes?.length}
                    <i
                      onClick={() => handleLikeRecipe(recipe._id || "")}
                      className="fa-solid fa-heart"
                      style={{ color: "#ff4242" }}
                    ></i>
                  </p>
                </div>
                <div className="card-text-container">
                  <p className="card-text">{recipe.dairyMeatType}</p>
                  <p className="card-text">
                    {recipe.ingredients.length} רכיבים
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="add-recipe-button"
          onClick={() => setOpenAddRecipeModal(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </div>

        {openAddRecipeModal && (
          <div>
            <div
              className="add-recipe-modal"
              onClick={() => setOpenAddRecipeModal(false)}
            ></div>
            <div className="add-recipe-modal-content">
              <AddRecipe onClose={() => setOpenAddRecipeModal(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
