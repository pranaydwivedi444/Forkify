// import { async } from "regenerator-runtime";
// import { search } from "core-js/fn/symbol";
import { API_URL, RESULTS_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipe: {},
  search: { query: "", results: {}, resultPerPage: RESULTS_PER_PAGE, page: 1 },
};
export const loadRecipe = async function (id) {
  try {
    let data = await getJSON(`${API_URL}/${id}`);

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
    console.log(err);
    throw err;
  }
};

export const searchingTool = async function (query) {
  try {
    state.search.query = query;
    let result = await getJSON(`${API_URL}?search=${query}`);
    // console.log(result);
    const {
      data: { recipes },
    } = result;

    state.search.results = recipes.map((rep) => {
      return (rep = {
        id: rep.id,
        title: rep.title,
        publisher: rep.publisher,
        image: rep.image_url,
      });
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.resultPerPage;
  let end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};
