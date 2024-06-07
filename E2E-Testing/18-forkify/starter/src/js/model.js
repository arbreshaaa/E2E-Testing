import 'regenerator-runtime/runtime';
import { API_URL, RES_PEER_PAGE, KEY } from './config';
//import { getJSON, sendJSON } from './helpers';
import { AJAX } from './helpers';
import { async } from 'regenerator-runtime';
import { filter } from 'core-js/./es/array';

export const state = {
  recipe: {},
  search: {
    query: ' ',
    page: 1,
    results: [],
    sortResults: [],
    resulstPerPage: RES_PEER_PAGE,
  },
  bookmark: [],
};

const createRecipeObjwct = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObjwct(data);
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    state.search.sortResults = await Promise.all(
      state.search.results.map(async function (el) {
        const data = await AJAX(`${API_URL}${el.id}?key=${KEY}`);
        return data.data.recipe;
      })
    );
    //console.log(state.search.sortResults);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const sortSearchResults = async function (property, direction) {
  // console.log(state.search.results);

  // Sorting full recipes:
  state.search.sortResults.sort(function (a, b) {
    if (+a['cooking_time'] <= +b['cooking_time']) {
      return -direction;
    } else {
      return +direction;
    }
  });
  //console.log(state.search.sortResults);

  // Extracting id's from sort recipes:
  const ids = state.search.sortResults.map(el => el.id);
  // console.log(ids);

  // Sorting results by id's:
  state.search.results.sort((a, b) => +ids.indexOf(a.id) - +ids.indexOf(b.id));
  // console.log(state.search.results);
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resulstPerPage;
  const end = page * state.search.resulstPerPage; //9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    //neQt=oldQt *newServings/oldservings//
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function (recipe) {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  //Add Bookmark
  state.bookmark.push(recipe);

  //Mark curent recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //DELETE Bookmark
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  //Mark curent recipe as NOT bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmark = JSON.parse(storage);
};

init();

const clearBookmark = function () {
  localStorage.clear('bookmark');
};

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) {
          throw new Error(
            'wrong ingridient format!Please use the corect format'
          );
        }
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObjwct(data);
    addBookmark(state.recipe);
    // console.log(data);
  } catch (err) {
    throw err;
  }
};
