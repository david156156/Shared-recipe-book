import { createContext, useContext, useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";

interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  dairyMeatType: string;
  mealType?: string[];
  likes?: number;
}

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  refreshed: boolean;
  setRefreshed: (refreshed: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshed, setRefreshed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
