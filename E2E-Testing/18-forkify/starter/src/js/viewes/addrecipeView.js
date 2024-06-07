import View from './View';
import icons from '../../img/icons.svg';

class addrecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfuly  uploadet';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnopen = document.querySelector('.nav__btn--add-recipe');
  _btnclosed = document.querySelector('.btn--close-modal');
  _btnAddRow = document.querySelector('button[class*=add-row]');

  _addCustomValidation() {
    const urlInput = this._parentElement.querySelector(
      'input[name="sourceUrl"]'
    );
    const imageUrlInput = this._parentElement.querySelector(
      'input[name="image"]'
    );
    const titlelInput = this._parentElement.querySelector(
      'input[name="title"]'
    );
    const uploadBtn = this._parentElement.querySelector('.upload__btn');

    const validateInputs = () => {
      const isUrlValid = urlInput.validity.valid;
      const isImageUrlValid = imageUrlInput.validity.valid;
      const isTitle = titlelInput.validity.valid;

      // Enable/disable the upload button based on field validity
      if (isUrlValid && isImageUrlValid) {
        uploadBtn.removeAttribute('disabled');
      } else {
        uploadBtn.setAttribute('disabled', true);
      }
    };

    urlInput.addEventListener('input', validateInputs);
    imageUrlInput.addEventListener('input', validateInputs);
    titlelInput.addEventListener('input', validateInputs);
  }

  constructor() {
    super();
    this._addHnadlerShowWindow();
    this._addCustomValidation();
  }

  togglewindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    this._addHnadlerHideindow();
  }
  _addHnadlerShowWindow() {
    this._btnopen.addEventListener('click', this.togglewindow.bind(this));
  }

  _addHnadlerHideindow() {
    this._btnclosed.addEventListener('click', this.togglewindow.bind(this));
    this._overlay.addEventListener('click', this.togglewindow.bind(this));
  }
  addHnadlerUplload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _addHandlerCheckIngredientInputs(handler) {
    const inputs = document.querySelectorAll('input[name*=ingredient]');
    inputs.forEach(input => input.removeEventListener('input', null));

    inputs.forEach(input => {
      input.addEventListener('input', handler);
    });
  }

  _btnAddRowAwake(condition) {
    const btnAddRow = document.querySelector('button[class*=add-row]');
    btnAddRow.classList = `upload__add-row ${
      condition === true ? 'awake' : ''
    }`;
  }

  _addHandlerAddRow(handler) {
    const btnAddRow = document.querySelector('button[class*=add-row]');
    btnAddRow.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _renderIngredientRow(parent) {
    const ingredientRows = document.querySelectorAll('input[name*=ingredient]');
    const lastRowNumber = ingredientRows.length / 1;

    parent.insertAdjacentHTML(
      'beforeend',
      `<div class="ingredient-row ${lastRowNumber + 1}">
        <label>Ingredient ${lastRowNumber + 1}</label>
        <input
          type="text"
            name="ingredient-${this._currentIngredientIndex}"
            placeholder="Format: 'Quantity,Unit,Description'"
        />`
    );

    const lastQntyField = document.querySelector(
      `input[name=ingredient-${lastRowNumber + 1}]`
    );
    //lastQntyField.focus();
  }

  // _genereatemarkup() {}
}

export default new addrecipeView();
