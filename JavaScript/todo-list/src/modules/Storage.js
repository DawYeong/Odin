import TodoList from "./TodoList";

export default class Storage {
  static clear() {
    localStorage.clear();
  }

  static saveTodo(todo) {
    console.log("STORAGE: Todo saved.");
    localStorage.setItem(
      "todo",
      JSON.stringify({ projects: todo.getProjects(), tasks: todo.getTasks() })
    );
  }

  static loadTodo() {
    console.log("STORAGE: Loading todo.");
    const todo = new TodoList();
    const todoStorage = localStorage.getItem("todo");
    if (todoStorage) {
      // load old app
      todo.importJson(JSON.parse(todoStorage));
    }
    return todo;
  }
}
