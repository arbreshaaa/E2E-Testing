class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = ' ';
  }

  addHandlerSearchInput(handler) {
    this._parentEl
      .querySelector('.search__field')
      .addEventListener('input', function (e) {
        const query = e.target.value;
        handler(query);
        console.log(query);
      });
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  
}
export default new SearchView();
