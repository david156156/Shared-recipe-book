import { FunctionComponent, use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { Recipe } from "../interfaces/Recipe";

interface RecipeDetailsProps {}

const RecipeDetails: FunctionComponent<RecipeDetailsProps> = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await getRecipeById(recipeId!);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);
  return (
    <>
      <div className="recipe-details-container">
        {recipe && (
          <div className="recipe-details-card">
            <div className="div-img">
              <h5 className="details-card-title">{recipe.title}</h5>

              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div className="details-card-body">
              <div>
                <p className="details-card-text">מרכיבים:</p>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="card-text">הוראות הכנה:</p>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
