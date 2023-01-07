import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
const recipeContainer = document.querySelector(".recipe");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    renderMarker(recipeContainer);
    //load recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // renderRecipe(recipe);
    //rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};
// https://forkify-api.herokuapp.com/v2

// showRecipe();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
