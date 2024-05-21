import { v4 as uuidv4 } from "uuid";

export default class Task {
  #projectId;

  constructor(projectId, title) {
    this.#projectId = projectId;
    this.id = uuidv4();
    this.title = title;
    this.important = false;
    this.description = "";
    this.dueDate = null;
  }

  setDueDate(date) {
    this.dueDate = date;
  }

  setDescription(desc) {
    this.description = desc;
  }

  toggleImportance() {
    this.important = !this.important;
  }

  getProjectId() {
    return this.#projectId;
  }

  getTaskId() {
    return this.id;
  }
}
