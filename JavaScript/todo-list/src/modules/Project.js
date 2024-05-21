import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, isDefault, id) {
    this.name = name;
    this.isDefault = isDefault ?? false;
    this.id = id ?? uuidv4();
    console.log(this.name, this.isDefault, this.id);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getIsDefault() {
    return this.isDefault;
  }
}
