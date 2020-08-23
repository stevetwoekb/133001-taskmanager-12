import {createElement} from '../utils';

const createFilterItemTemplate = (filter, isChecked) => {
  const {title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

const createSiteFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
  .map((filter, index) => createFilterItemTemplate(filter, index === 0))
  .join(``);

  return `<section class="main__filter filter container">
    ${filterItemsTemplate}
  </section>`;
};


export default class SiteFilterView {
  constructor(filterItems) {
    this._element = null;
    this._filterItems = filterItems;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filterItems);
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
