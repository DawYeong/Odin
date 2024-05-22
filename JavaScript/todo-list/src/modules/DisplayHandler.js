import Storage from "./Storage";
import { clearElement, createElement } from "../utils";
import "../styles/main.css";

export default class DisplayHandler {
  static todo = Storage.loadTodo();
  static #projects = document.querySelector("div.projects");
  static #header = document.querySelector("div.header");
  static #mainContent = document.querySelector("div.main-content");

  // init => set up everything => event listeners and things
  static init() {
    // display initial page
    DisplayHandler.#initPageElements();
    DisplayHandler.#initEventListeners();
  }

  static displayTasks() {
    clearElement(DisplayHandler.#mainContent);
    const tasks = DisplayHandler.todo.getProjectTasks(
      DisplayHandler.todo.getActiveProject().getId()
    );

    DisplayHandler.#mainContent.appendChild(
      createElement(
        "div",
        "project-title",
        "",
        DisplayHandler.todo.getActiveProject().getName()
      )
    );
    const taskItems = createElement("div", "task-items", "", "");
    tasks.forEach((task) => {
      taskItems.appendChild(DisplayHandler.#createTaskItem(task));
    });

    DisplayHandler.#mainContent.appendChild(taskItems);
  }

  static displayProjects() {
    clearElement(DisplayHandler.#projects);
    DisplayHandler.todo.getProjects().forEach((project) => {
      DisplayHandler.#projects.appendChild(
        DisplayHandler.#createProjectItem(project)
      );
    });
  }

  static #initPageElements() {
    DisplayHandler.#initHeader();
    DisplayHandler.displayProjects();
    DisplayHandler.displayTasks();
  }

  static #initHeader() {
    DisplayHandler.#header.appendChild(
      createElement("button", "side-menu-toggle", "", "Toggle")
    );
    DisplayHandler.#header.appendChild(
      createElement("h1", "", "", "Todo List")
    );
  }

  static #createProjectItem(project) {
    const projectItem = createElement("div", "project-item", "", "");
    // add more elements
    projectItem.appendChild(createElement("p", "", "", project.getName()));
    return projectItem;
  }

  static #createTaskItem(task) {
    const taskItem = createElement("div", "task-item", "", "");
    // add more elements
    taskItem.appendChild(createElement("p", "", "", task.getTitle()));
    return taskItem;
  }

  static #initEventListeners() {}
}
