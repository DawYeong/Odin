import Project from "./Project";
import Task from "./Task";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.tasks = [];
    this.projects.push(new Project("Tasks", true));
    this.activeProject = this.projects[0];
  }

  getActiveProject() {
    return this.activeProject;
  }

  setActiveProject(projectId) {
    this.activeProject =
      this.projects[
        this.projects.findIndex((project) => project.getId() === projectId)
      ];
  }

  getProjects() {
    return this.projects;
  }

  addProject(name) {
    this.projects.push(new Project(name, false));
  }

  deleteProject(projectId) {
    // removes project and associated tasks
    if (this.activeProject.getId() === projectId) {
      this.activeProject = this.projects[0];
    }

    this.projects.splice(
      this.projects.findIndex((project) => project.getId() === projectId),
      1
    );

    const projectTasks = this.tasks.filter(
      (task) => task.getProjectId() === projectId
    );
    projectTasks.forEach((task) => {
      this.deleteTask(task.getTaskId());
    });
  }

  addTask(title) {
    // adds task to active project
    this.tasks.push(new Task(this.activeProject.getId(), title));
  }

  deleteTask(taskId) {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.getTaskId() === taskId),
      1
    );
  }
}
