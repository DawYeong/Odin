import { v4 as uuidv4 } from "uuid";

export default class Task {
  constructor(
    projectId,
    title,
    description,
    important,
    completed,
    dueDate,
    id
  ) {
    this.projectId = projectId;
    this.title = title;
    this.important = important ?? false;
    this.completed = completed ?? false;
    this.description = description ?? "";
    this.dueDate = dueDate ?? null;
    this.id = id ?? uuidv4();
  }

  setTitle(title) {
    this.title = title;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  setDueDate(date) {
    this.dueDate = date;
  }

  setDescription(desc) {
    this.description = desc;
  }

  setImportant(important) {
    this.important = important;
  }

  getTitle() {
    return this.title;
  }

  getImportant() {
    return this.important;
  }

  getCompleted() {
    return this.completed;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getProjectId() {
    return this.projectId;
  }

  getTaskId() {
    return this.id;
  }
}
