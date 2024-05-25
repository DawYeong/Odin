import Project from "./Project";
import Task from "./Task";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.tasks = [];
    this.projects.push(new Project("General", true));
    this.projects.push(new Project("Important", true));
    this.activeProject = this.projects[0];
  }

  getActiveProject() {
    return this.activeProject;
  }

  setActiveProject(projectId) {
    this.activeProject = this.getProject(projectId);
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectId) {
    return this.projects[this.#getProjectIndex(projectId)];
  }

  getProjectTasks(projectId) {
    const project = this.getProject(projectId);

    console.log(project);

    if (project.getIsDefault()) {
      switch (project.getName()) {
        case "General":
          return this.tasks;
        case "Important":
          return this.tasks.filter((task) => task.getImportant() === true);
      }
    }

    return this.tasks.filter((task) => task.getProjectId() === projectId);
  }

  #getProjectIndex(projectId) {
    return this.projects.findIndex((project) => project.getId() === projectId);
  }

  #getTaskIndex(taskId) {
    return this.tasks.findIndex((task) => task.getTaskId() === taskId);
  }

  getTask(taskId) {
    return this.tasks[this.#getTaskIndex(taskId)];
  }

  getTasks() {
    return this.tasks;
  }

  addProject(name, isDefault, id) {
    console.log(name, isDefault, id);
    this.projects.push(new Project(name, isDefault, id));
  }

  setTaskCompleted(taskId, completed) {
    const taskInd = this.#getTaskIndex(taskId);

    if (taskInd === -1) return;
    this.tasks[taskInd].setCompleted(completed);
  }

  updateTask(taskId, title, important, completed, description, dueDate) {
    const taskInd = this.#getTaskIndex(taskId);
    this.tasks[taskInd].setTitle(title);
    this.tasks[taskInd].setImportant(important);
    this.tasks[taskInd].setCompleted(completed);
    this.tasks[taskInd].setDescription(description);
    this.tasks[taskInd].setDueDate(dueDate);
  }

  updateProject(projectId, name) {
    const projectInd = this.#getProjectIndex(projectId);
    this.projects[projectInd].setName(name);
  }

  deleteProject(projectId) {
    // removes project and associated tasks
    if (this.activeProject.getId() === projectId) {
      this.activeProject = this.projects[0];
    }

    const projectTasks = this.getProjectTasks(projectId);
    projectTasks.forEach((task) => {
      this.deleteTask(task.getTaskId());
    });

    this.projects.splice(
      this.projects.findIndex((project) => project.getId() === projectId),
      1
    );
  }

  addTask(title, description, important, completed, dueDate, id, projectId) {
    const projId = projectId ?? this.activeProject.getId();
    const project = this.getProject(projId);
    this.tasks.push(
      new Task(
        projectId ?? this.activeProject.getId(),
        title,
        description,
        // if we create a task under the Important project, then we have to set important to true regardless
        project.getIsDefault() && project.getName() === "Important"
          ? true
          : important,
        completed,
        dueDate,
        id
      )
    );
  }

  deleteTask(taskId) {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.getTaskId() === taskId),
      1
    );
  }

  importJson(json) {
    this.projects = [];
    this.tasks = [];
    json["projects"].forEach((project) => {
      this.addProject(project["name"], project["isDefault"], project["id"]);
    });

    json["tasks"].forEach((tasks) => {
      this.addTask(
        tasks["title"],
        tasks["description"],
        tasks["important"],
        tasks["completed"],
        tasks["dueDate"],
        tasks["id"],
        tasks["projectId"]
      );
    });

    this.activeProject = this.projects[0];
  }
}
