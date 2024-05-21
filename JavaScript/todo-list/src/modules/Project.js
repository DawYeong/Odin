import { v4 as uuidv4 } from "uuid";

export default class Project {
  #id;
  constructor(name, isDefault) {
    this.#id = uuidv4();
    this.name = name;
    this.isDefault = isDefault;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.name;
  }

  getIsDefault() {
    return this.isDefault;
  }
}
