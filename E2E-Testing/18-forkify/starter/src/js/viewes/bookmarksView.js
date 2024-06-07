import View from './View';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessag = 'No BookMark yet.Find a nice recipe and bookmark it';
  _message = '';


  addHnadlerRender(handler)
  {
    window.addEventListener('load',handler)
  }
  
  _genereatemarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarksView();
