import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteBoardTemplate} from "./view/site-board.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditFormTemplate} from "./view/edit-task-form.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {render, repeat} from "./utils.js";

const TASK_COUNT = 3;

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createSiteMenuTemplate());
render(mainElement, createSiteFilterTemplate());
render(mainElement, createSiteBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

render(tasksContainerElement, createTaskEditFormTemplate());

repeat(TASK_COUNT, () => {
  render(tasksContainerElement, createTaskTemplate());
});

render(boardElement, createLoadMoreButtonTemplate());
