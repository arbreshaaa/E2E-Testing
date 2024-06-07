import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeviews from './viewes/recipeviews';
import { async } from 'regenerator-runtime';
import searchView from './viewes/searchView.js';
import resultsView from './viewes/resultsView.js';
import bookmarksView from './viewes/bookmarksView.js';
import paginationView from './viewes/paginationView.js';
import addrecipeView from './viewes/addrecipeView.js';

const recipeContainer = document.querySelector('.recipe');
_parentVeg = document.querySelector('.search__filter-btn');

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // Fet search query
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeviews.renderSpinner();

    //0 update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmark);
    //1 load recipe
    await model.loadRecipe(id);
    //render recipe
    recipeviews.render(model.state.recipe);
    // const recipeView=new recipeView(model.state,recipe);
  } catch (err) {
    recipeviews.renderError();
  }
};

const controlLiveSearch = async function (query) {
  try {
    resultsView.renderSpinner();
    if (!query) {
      resultsView.clear(); // Clear results if query is empty
      return;
    }

    // Load search results
    await model.loadSearchResults(query);

    // Render updated results and pagination view
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1 get search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    //2 load search results
    await model.loadSearchResults(query);
    //console.log(model.state.search.results);

    //3 Render Result
    resultsView.render(model.getSearchResultsPage());

    //4 render the intitianiol pagination buttoon
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlSortResults = function (property, direction) {
  // resultsView.renderSpinner();

  console.log('yugswuyhwv', 'sort button');
  //model.sortSearchResults(property, direction);
  model.sortSearchResults('cooking_time', direction);

  // 3) Render results
  resultsView.render(model.getSearchResultsPage());

  // 4) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
  //1 Render  new Result
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2 render NEW intitianiol pagination buttoon
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  //updtate recipe servings (in state)
  model.updateServings(newServings);

  //updtade the recipe  view
  //recipeviews.render(model.state.recipe);
  recipeviews.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //ad/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);

  //update recipe view
  recipeviews.update(model.state.recipe);

  //render bookmarks

  bookmarksView.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmark);
};

const ControlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addrecipeView.renderSpinner();
    //upload recipe data
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);
    //render recipe
    recipeviews.render(model.state.recipe);

    //succses message
    addrecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //window.history.back();
    //close form
    setTimeout(function () {
      addrecipeView.togglewindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addrecipeView.renderError(err.message);
  }
};
const controlAddRow = function () {
  try {
    if (addrecipeView._btnAddRow.classList != 'upload__add-row awake') {
      throw new Error('Please fill all fields before adding a new ingredient.');
    }

    // console.log('add-row button WAS CLICKED!');
    // console.log(ingredientScrollBox);
    // console.log(lastRowNumber);

    const ingredientScrollBox = document.querySelector(
      'div.upload__column.ingredients.scrollbox'
    );

    addrecipeView._renderIngredientRow(ingredientScrollBox);
    addrecipeView._addHandlerCheckIngredientInputs(
      controlCheckIngredientInputs
    );
    const btnAddRow = document.querySelector('button[class*=add-row]');

    btnAddRow.classList = 'upload__add-row';
  } catch (err) {
    console.error('💥', err);
    addrecipeView.renderError(err.message);
  }
};

const controlCheckIngredientInputs = function () {
  const inputs = document.querySelectorAll('input[name*=ingredient]');

  let allFilled = true;

  inputs.forEach(input => {
    if (input.type === 'text' && input.value.trim() === '') {
      allFilled = false;
    } else if (
      input.type == 'number' &&
      (input.value === '' ||
        input.value === null ||
        input.value === undefined ||
        input.value === NaN ||
        !input.value)
    ) {
      allFilled = false;
    }
  });

  addrecipeView._btnAddRowAwake(allFilled);
};

const init = function () {
  bookmarksView.addHnadlerRender(controlBookmark);
  recipeviews.addHandlenRender(controlRecipes);
  recipeviews.addHandlerUpdateServings(controlServing);
  recipeviews.addHandlenAddBookmark(controlAddBookmark);
  //searchView.addHandlerSearchInput(controlLiveSearch);
  searchView.addHandlerSearch(controlSearchResults);
  //resultsView.addHandlerSort(controlSortResults);
  paginationView.addHnadlerClick(controlPagination);
  addrecipeView.addHnadlerUplload(ControlAddRecipe);
  addrecipeView._addHandlerAddRow(controlAddRow);
  addrecipeView._addHandlerCheckIngredientInputs(controlCheckIngredientInputs);
};
init();
