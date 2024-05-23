import Storage from "./Storage";
import { clearElement, createElement } from "../utils";
import "../styles/main.css";

export default class DisplayHandler {
  static todo = Storage.loadTodo();
  static #projects = document.querySelector("div.projects");
  static #header = document.querySelector("div.header");
  static #mainContent = document.querySelector("div.main-content");
  static #sideMenu = document.querySelector("div.side-menu");
  static #navBtn = document.querySelector(".nav-btn");

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
    DisplayHandler.displayProjects();
    DisplayHandler.displayTasks();
  }

  static #createProjectItem(project) {
    const projectItem = createElement("div", "project-item", "", "", {
      projectId: project.getId(),
    });
    // add more elements
    projectItem.appendChild(createElement("div", "", "", project.getName()));
    return projectItem;
  }

  static #createTaskItem(task) {
    const taskItem = createElement("div", "task-item", "", "");
    // add more elements
    taskItem.appendChild(
      createElement("input", "", "", "", { type: "checkbox" })
    );
    taskItem.appendChild(createElement("p", "", "", task.getTitle()));
    return taskItem;
  }

  static #initEventListeners() {
    document
      .querySelectorAll("button.side-menu-toggle")
      .forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", () => {
          DisplayHandler.#toggleSideMenu();
        });
      });

    document.querySelector(".task-items").addEventListener("click", (e) => {
      if (e.target.nodeName === "INPUT") {
        console.dir(e.target.checked);
      }
    });

    document.querySelector(".projects").addEventListener("click", (e) => {
      const projectId = DisplayHandler.#getProjectIdFromEvent(e.target);

      if (projectId != DisplayHandler.todo.getActiveProject()) {
        DisplayHandler.todo.setActiveProject(projectId);
        DisplayHandler.displayTasks();
      }
    });
  }

  static #toggleSideMenu() {
    DisplayHandler.#sideMenu.classList.toggle("open");
    DisplayHandler.#navBtn.classList.toggle("close");
  }

  static #getProjectIdFromEvent(event) {
    let currEvent = event;
    while (currEvent.className != "project-item") {
      currEvent = currEvent.parentNode;
    }

    return currEvent.attributes["projectId"].value;
  }
}
