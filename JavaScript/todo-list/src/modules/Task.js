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

  setDueDate(date) {
    this.dueDate = date;
  }

  setDescription(desc) {
    this.description = desc;
  }

  toggleImportance() {
    this.important = !this.important;
  }

  getTitle() {
    return this.title;
  }

  getProjectId() {
    return this.projectId;
  }

  getTaskId() {
    return this.id;
  }
}
