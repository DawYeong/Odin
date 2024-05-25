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
    const leftContainer = createElement("div", "proj-left-container", "", "");
    leftContainer.appendChild(createElement("p", "", "", project.getName()));

    const rightContainer = createElement("div", "proj-right-container", "", "");
    if (!project.getIsDefault()) {
      rightContainer.appendChild(createElement("button", "edit", "", "Edit"));
    }
    rightContainer.appendChild(
      createElement(
        "div",
        "task-num",
        "",
        DisplayHandler.todo.getProjectTasks(project.getId()).length
      )
    );
    // projectItem.appendChild(createElement("div", "", "", project.getName()));
    projectItem.appendChild(leftContainer);
    projectItem.appendChild(rightContainer);
    return projectItem;
  }

  static #createTaskItem(task) {
    const taskItem = createElement("div", "task-item", "", "", {
      taskId: task.getTaskId(),
    });
    // add more elements
    const checkBox = createElement("input", "", "", "", { type: "checkbox" });
    checkBox.checked = task.getCompleted();
    taskItem.appendChild(checkBox);
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

    DisplayHandler.#mainContent.addEventListener("click", (e) => {
      DisplayHandler.#handleMainContentListener(e);
    });

    document.querySelector(".projects").addEventListener("click", (e) => {
      DisplayHandler.#handleProjectsListener(e);
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
      console.log(DisplayHandler.#forms[0].attributes["action"]);
      switch (DisplayHandler.#forms[0].attributes["action"].value) {
        case "add":
          DisplayHandler.#handleAddTask();
          break;
        case "edit":
          DisplayHandler.#handleEditTask();
          break;
      }
      DisplayHandler.displayTasks();
      DisplayHandler.displayProjects();
      closeFormModal(DisplayHandler.#dialogs[0], DisplayHandler.#forms[0]);
    });

    DisplayHandler.#forms[1].addEventListener("submit", (e) => {
      e.preventDefault();
      switch (DisplayHandler.#forms[1].attributes["action"].value) {
        case "add":
          DisplayHandler.#handleAddProject();
          break;
        case "edit":
          DisplayHandler.#handleEditProject();
          DisplayHandler.displayTasks();
          break;
      }
      DisplayHandler.displayProjects();
      closeFormModal(DisplayHandler.#dialogs[1], DisplayHandler.#forms[1]);
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

  static #getProjectIdFromElement(element) {
    let currElement = element;
    while (currElement.className != "project-item") {
      currElement = currElement.parentNode;
    }

    return currElement.attributes["projectId"].value;
  }

  static #getTaskIdFromElement(element) {
    let currElement = element;
    while (currElement.className != "task-item") {
      if (currElement === DisplayHandler.#mainContent) {
        return null;
      }

      currElement = currElement.parentNode;
    }

    return currElement.attributes["taskId"].value;
  }

  static #handleMainContentListener(e) {
    const taskItem = DisplayHandler.#getTaskIdFromElement(e.target);
    if (e.target.nodeName === "INPUT") {
      DisplayHandler.todo.setTaskCompleted(taskItem, e.target.checked);
    } else if (taskItem != null) {
      // console.log(DisplayHandler.todo.getTask(taskItem));
      DisplayHandler.#handleEditTaskPrompt(
        DisplayHandler.todo.getTask(taskItem)
      );
      // console.log(taskItem, e.target);
    }
  }

  static #handleProjectsListener(e) {
    const projectId = DisplayHandler.#getProjectIdFromElement(e.target);
    if (e.target.className === "edit") {
      DisplayHandler.#handleEditProjectPrompt(projectId);
    } else {
      DisplayHandler.#handleProjectSelection(projectId);
    }
  }

  static #handleProjectSelection(projectId) {
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

  static #handleEditTaskPrompt(task) {
    console.log(task);
    DisplayHandler.#forms[0].children[0].textContent = `Edit ${task.getTitle()}`;
    DisplayHandler.#forms[0].setAttribute("action", "edit");
    DisplayHandler.#forms[0].setAttribute("taskId", task.getTaskId());
    const inputs = DisplayHandler.#forms[0].querySelectorAll("input");
    const description = DisplayHandler.#forms[0].querySelector("textarea");

    inputs[0].value = task.getTitle();
    inputs[1].checked = task.getImportant();
    inputs[2].checked = task.getCompleted();
    inputs[3].value = task.getDueDate();
    description.value = task.getDescription();
    openFormModal(DisplayHandler.#dialogs[0]);
  }

  static #handleEditProjectPrompt(projectId) {
    const project = DisplayHandler.todo.getProject(projectId);
    DisplayHandler.#forms[1].setAttribute("action", "edit");
    DisplayHandler.#forms[1].setAttribute("projectId", project.getId());
    DisplayHandler.#forms[1].children[0].textContent = `Edit ${project.getName()}`;
    DisplayHandler.#forms[1].children[1].value = project.getName();
    openFormModal(DisplayHandler.#dialogs[1]);
  }

  static #handleDialogClick(e, dialog, form) {
    if (
      e.target != dialog &&
      e.target.className != "cancel" &&
      e.target.className != "delete"
    )
      return;

    if (e.target.className === "delete") {
      DisplayHandler.#handleDelete(form);
    }

    closeFormModal(dialog, form);
  }

  static #handleAddTask() {
    const inputs = DisplayHandler.#forms[0].querySelectorAll("input");
    const description = DisplayHandler.#forms[0].querySelector("textarea");

    DisplayHandler.todo.addTask(
      inputs[0].value,
      description.value,
      inputs[1].checked,
      inputs[2].checked,
      inputs[3].value.length > 0 ? inputs[3].value : null
    );
    // DisplayHandler.displayTasks();
    // closeFormModal(DisplayHandler.#dialogs[0], DisplayHandler.#forms[0]);
  }

  static #handleEditTask() {
    console.log(DisplayHandler.#forms[0]);
    const taskId = DisplayHandler.#forms[0].attributes["taskId"].value;
    const inputs = DisplayHandler.#forms[0].querySelectorAll("input");
    const description = DisplayHandler.#forms[0].querySelector("textarea");

    DisplayHandler.todo.updateTask(
      taskId,
      inputs[0].value,
      inputs[1].checked,
      inputs[2].checked,
      description.value,
      inputs[3].value.length > 0 ? inputs[3].value : null
    );
  }

  static #handleAddProject() {
    DisplayHandler.todo.addProject(DisplayHandler.#forms[1].children[1].value);
  }

  static #handleEditProject() {
    const projectId = DisplayHandler.#forms[1].attributes["projectId"].value;
    DisplayHandler.todo.updateProject(
      projectId,
      DisplayHandler.#forms[1].children[1].value
    );
  }

  static #handleDelete(form) {
    switch (form.id) {
      case "task-form":
        DisplayHandler.todo.deleteTask(form.attributes["taskId"].value);
        break;
      case "project-form":
        DisplayHandler.todo.deleteProject(form.attributes["projectId"].value);
        break;
    }
    DisplayHandler.displayProjects();
    DisplayHandler.displayTasks();
  }
}
