// import { search } from "core-js/fn/symbol";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
const recipeContainer = document.querySelector(".recipe");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderMarker(recipeContainer);
    //load recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(err);
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderMarker();
    console.log(resultsView);
    //getting query from serach bar
    const query = searchView.getQuery();
    if (!query) return;
    //storing results in state
    await model.searchingTool(query);
    //render results
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
    resultsView.renderError(error);
  }
};
// https://forkify-api.herokuapp.com/v2

// showRecipe();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
if (module.hot) module.hot.accept();
