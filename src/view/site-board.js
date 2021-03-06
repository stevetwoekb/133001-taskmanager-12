import {createElement} from '../utils.js';

const createSiteBoardTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
          <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
          <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
      </div><div class="board__tasks">
      </div>
      </section>
    `
  );
};


export default class SiteBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
