import axios from "axios";
import { Recipe } from "../interfaces/Recipe";

const api: string = `${process.env.REACT_APP_API}/recipe`;

export function getAllRecipes() {
  return axios.get(api);
}

export function getRecipeById(RecipeId: string) {
  return axios.get(`${api}/${RecipeId}`);
}

export function getRecipesByUser(userId: string) {
  const token = localStorage.getItem("token");
  return axios.get(`${api}/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function getRecipesByUserLike(userId: string) {
  const token = localStorage.getItem("token");
  return axios.get(`${api}/like/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function createRecipe(recipe: Recipe) {
  const token = localStorage.getItem("token");
  return axios.post(api, recipe, {
    headers: {
      Authorization: token,
    },
  });
}

export function updateRecipe(recipe: Recipe, recipeId: string) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/${recipeId}`, recipe, {
    headers: {
      Authorization: token,
    },
  });
}

export function deleteRecipe(RecipeId: string) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/${RecipeId}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function likeRecipe(RecipeId: string) {
  const token = localStorage.getItem("token");
  return axios.patch(
    `${api}/like/${RecipeId}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
