export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const repeat = (count, fn) => {
  Array(count).fill(``).forEach(fn);
};
