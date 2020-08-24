import {render} from "./utils.js";
import SiteMenu from "./view/site-menu.js";
import SiteFilter from "./view/site-filter.js";
import SiteBoard from "./view/site-board.js";
import Task from "./view/task.js";
import EditTaskForm from "./view/edit-task-form.js";
import LoadMoreButton from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, new SiteMenu().getElement());
render(mainElement, new SiteFilter(filters).getElement());
render(mainElement, new SiteBoard().getElement());

const boardElement = mainElement.querySelector(`.board`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new EditTaskForm(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });


  render(taskListElement, taskComponent.getElement());
};
tasks.slice(0, TASK_COUNT_PER_STEP).forEach((task) => renderTask(tasksContainerElement, task));

if (tasks.length > TASK_COUNT_PER_STEP) {
  const LoadMoreButtonElement = new LoadMoreButton();
  render(boardElement, LoadMoreButtonElement.getElement());

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  LoadMoreButtonElement.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTask(tasksContainerElement, task));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      LoadMoreButtonElement.getElement().remove();
      LoadMoreButtonElement.removeElement();
    }
  });
}
