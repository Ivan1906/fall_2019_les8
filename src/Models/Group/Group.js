import { types, flow, getRoot } from "mobx-state-tree";
import { Todo } from "../Todo/Todo";
import Api from "../../api/Api";
import uuid from "uuid";

export const Group = types
  .model("Group", {
    id: types.identifier,
    title: types.string,
    todos: types.optional(types.array(Todo), []),
    isLoading: false,
    isError: false
  })
  .actions(self => ({
    send: flow(function* send() {
      self.isLoading = true;
      self.isError = false;

      try {
        const group = yield Api.Groups.add(self);
        getRoot(self).groups.replaceGroup(self.id, group);
      } catch (e) {
        console.log(e);
        self.isError = true;
      } finally {
        self.isLoading = false;
      }
    }),
    addTodo: flow(function* addTodo(title) {
      const todo = Todo.create({ id: uuid(), title });
      self.todos.push(todo);
      yield todo.send(self.id);
    }),
    replaceTodoInArrayTodos(oldTodoId, todo) {
      let idx = self.todos.findIndex(todo => todo.id === oldTodoId);
      self.todos[idx] = todo;
    }
  }));
