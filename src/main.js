import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteBoardTemplate} from "./view/site-board.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditFormTemplate} from "./view/edit-task-form.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {render} from "./utils.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createSiteMenuTemplate());
render(mainElement, createSiteFilterTemplate(filters));
render(mainElement, createSiteBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

render(tasksContainerElement, createTaskEditFormTemplate(tasks[0]));

tasks.slice(1, TASK_COUNT_PER_STEP).forEach((task) => render(tasksContainerElement, createTaskTemplate(task)));

if (tasks.length > TASK_COUNT_PER_STEP) {
  render(boardElement, createLoadMoreButtonTemplate());

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(tasksContainerElement, createTaskTemplate(task)));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
