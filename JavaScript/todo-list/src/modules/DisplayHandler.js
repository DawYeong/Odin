import Storage from "./Storage";
import {
  clearElement,
  createElement,
  openFormModal,
  closeFormModal,
} from "../utils";
import "../styles/main.css";

export default class DisplayHandler {
  static todo = Storage.loadTodo();
  static #projects = document.querySelector("div.projects");
  static #mainContent = document.querySelector("div.main-content");
  static #sideMenu = document.querySelector("div.side-menu");
  static #navBtn = document.querySelector(".nav-btn");
  static #dialogs = document.querySelectorAll("dialog");
  static #forms = document.querySelectorAll("form");

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
      DisplayHandler.#handleProjectSelection(e);
    });

    document.querySelector(".new-task-btn").addEventListener("click", (e) => {
      DisplayHandler.#handleAddPrompt(
        DisplayHandler.#dialogs[0],
        DisplayHandler.#forms[0],
        "Task"
      );
    });

    document.querySelector(".new-project-btn").addEventListener("click", () => {
      DisplayHandler.#handleAddPrompt(
        DisplayHandler.#dialogs[1],
        DisplayHandler.#forms[1],
        "Project"
      );
    });

    DisplayHandler.#forms[0].addEventListener("submit", (e) => {
      e.preventDefault();
      DisplayHandler.#handleAddTask();
    });

    DisplayHandler.#forms[1].addEventListener("submit", (e) => {
      e.preventDefault();
      DisplayHandler.#handleAddProject();
    });

    DisplayHandler.#dialogs.forEach((dialog, i) => {
      dialog.addEventListener("click", (e) => {
        DisplayHandler.#handleDialogClick(e, dialog, DisplayHandler.#forms[i]);
      });
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

  static #handleProjectSelection(e) {
    const projectId = DisplayHandler.#getProjectIdFromEvent(e.target);

    if (projectId != DisplayHandler.todo.getActiveProject()) {
      DisplayHandler.todo.setActiveProject(projectId);
      DisplayHandler.displayTasks();
    }
  }

  static #handleAddPrompt(dialog, form, itemType) {
    form.children[0].textContent = `Add New ${itemType}`;
    form.setAttribute("action", "add");
    openFormModal(dialog);
  }

  static #handleDialogClick(e, dialog, form) {
    if (e.target === dialog || e.target.className === "cancel") {
      // close
      closeFormModal(dialog, form);
    }
  }

  static #handleAddTask() {
    const inputs = DisplayHandler.#forms[0].querySelectorAll("input");
    const description = DisplayHandler.#forms[0].querySelector("textarea");

    DisplayHandler.todo.addTask(
      inputs[0].value,
      description.value,
      inputs[1].checked,
      inputs[2].checked,
      inputs[3].value.length > 0 ? inputs[3].value.length : null
    );
    DisplayHandler.displayTasks();
    closeFormModal(DisplayHandler.#dialogs[0], DisplayHandler.#forms[0]);
  }

  static #handleAddProject() {
    DisplayHandler.todo.addProject(DisplayHandler.#forms[1].children[1].value);
    DisplayHandler.displayProjects();
    closeFormModal(DisplayHandler.#dialogs[1], DisplayHandler.#forms[1]);
  }
}
