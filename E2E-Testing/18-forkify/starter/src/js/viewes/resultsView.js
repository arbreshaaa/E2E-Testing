import View from './View';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _durationSortButtonAsc = document.querySelector('.sort-btn.time--asc');
  _durationSortButtonDsc = document.querySelector('.sort-btn.time--dsc');
  _errorMessag = 'No recipes found for your query.Please try again';
  _message = '';
  _sortpanel = document.querySelector('.sort-panel');
  _parentVeg = document.querySelector('.searchVegi');

  _genereatemarkup() {
    //console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  addHandlerSort(handler) {
    this._sortpanel.addEventListener('click', function (e) {
      // e.preventDefault();
      const btn = e.target.closest('.sort-btn');
      if (!btn) return;

      const prop = btn.dataset.property;
      const direct = btn.dataset.direction;
      handler(prop, direct);
    });
  }

}

export default new ResultView();
