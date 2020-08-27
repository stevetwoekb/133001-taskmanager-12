import {render, RenderPosition} from "./utils.js";
import SiteMenu from "./view/site-menu.js";
import SiteFilter from "./view/site-filter.js";
import Board from "./view/board.js";
import Sort from "./view/sort.js";
import Task from "./view/task.js";
import EditTaskForm from "./view/edit-task-form.js";
import LoadMoreButton from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import TaskList from "./view/task-list.js";
import NoTask from "./view/no-task.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new EditTaskForm(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const closeEditCardForm = () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };


  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closeEditCardForm(evt);
    }
  };


  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, () => {
    closeEditCardForm();
  });


  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new Board();
  const taskListComponent = new TaskList();

  render(boardContainer, boardComponent.getElement());
  render(boardComponent.getElement(), taskListComponent.getElement());

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTask().getElement());
    return;
  }

  render(boardComponent.getElement(), new Sort().getElement(), RenderPosition.AFTERBEGIN);

  boardTasks
  .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
  .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButton();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};


render(headerElement, new SiteMenu().getElement());
render(mainElement, new SiteFilter(filters).getElement());

renderBoard(mainElement, tasks);
