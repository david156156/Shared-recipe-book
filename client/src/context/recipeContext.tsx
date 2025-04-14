import { createContext, useContext, useEffect, useState } from "react";
import { getAllRecipes, likeRecipe } from "../services/recipeService";
import { useUser } from "./userContext";
import { useNavigate } from "react-router-dom";

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

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  refreshed: boolean;
  setRefreshed: (refreshed: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleRecipeClick: (recipeId: string) => void;
  handleLikeRecipe: (recipeId: string) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshed, setRefreshed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipeDetails/${recipeId}`);
  };

  const handleLikeRecipe = async (recipeId: string) => {
    if (!user) {
      alert("אנא התחבר כדי לשמור מתכון");
      return;
    }
    try {
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe._id === recipeId) {
          return {
            ...recipe,
            likes: recipe.likes?.includes(user._id)
              ? recipe.likes?.filter((id) => id !== user._id)
              : [...(recipe.likes || []), user._id],
          };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);

      await likeRecipe(recipeId);
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  useEffect(() => {
    getAllRecipes()
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, [refreshed]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
        refreshed,
        setRefreshed,
        loading,
        setLoading,
        handleRecipeClick,
        handleLikeRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
