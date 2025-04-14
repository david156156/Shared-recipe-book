import { FunctionComponent, use } from "react";
import { useRecipes } from "../context/recipeContext";
import { useUser } from "../context/userContext";

interface RecipesILikedProps {}

const RecipesILiked: FunctionComponent<RecipesILikedProps> = () => {
  const { recipes, handleRecipeClick, handleLikeRecipe } = useRecipes();
  const { user } = useUser();

  const likedRecipes = recipes.filter((recipe) =>
    recipe.likes?.includes(user?._id || "")
  );
  return (
    <>
      <div className="recipes-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>מתכונים שאהבתי</h1>
          </div>
        </section>
        <div className="main-content">
          {likedRecipes.map((recipe) => (
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
      </div>
    </>
  );
};

export default RecipesILiked;
