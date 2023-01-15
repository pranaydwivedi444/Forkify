// import { search } from "core-js/fn/symbol";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
const recipeContainer = document.querySelector(".recipe");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderMarker(recipeContainer);
    //results view update selected recipe
    resultsView.update(model.getSearchResultsPage());
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
    // console.log(resultsView);
    //getting query from serach bar
    const query = searchView.getQuery();
    if (!query) return;
    //storing results in state
    await model.searchingTool(query);
    //render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render intial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultsView.renderError(error);
  }
};
// https://forkify-api.herokuapp.com/v2

// showRecipe();
const controlServings = function (newServings) {
  //changing the state
  model.updateServings(newServings);
  //rending the view again
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlPagination = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
if (module.hot) module.hot.accept();
