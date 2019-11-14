import { types, flow, getRoot } from "mobx-state-tree";
import uuid from "uuid/v4";
import { Todo } from "./Todo";
import Api from "../../api/Api";
import { values } from "mobx";

export const TodoList = types
  .model("TodoList", {
    todos: types.optional(types.array(Todo), []),
    isLoading: false,
    isError: false
  })
  .actions(self => ({
    loadTodos: flow(function* loadTodos() {
      self.isLoading = true;
      self.isError = false;

      try {
        self.todos = yield Api.Todos.getAll();
      } catch (e) {
        console.log(e);
        self.isError = true;
      } finally {
        self.isLoading = false;
      }
      yield;
    }),
    add: flow(function* add(title, group) {
      const todo = Todo.create({ id: uuid(), title, group: group.id });
      self.todos.push(todo);
      yield todo.send();
    })
  }))
  .views(self => ({
    get listFavorities() {
      const favorities = [];
      values(getRoot(self).groups.groups).forEach(group => {
        values(group.todos).forEach(todo => {
          if (todo.isFavorite) {
            favorities.push(todo);
          }
        });
      });
      return favorities;
    }
  }));
