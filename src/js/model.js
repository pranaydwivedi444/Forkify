// import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    let data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingtime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
