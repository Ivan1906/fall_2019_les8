import { types, flow, getRoot } from "mobx-state-tree";
import uuid from "uuid/v4";
import { Todo } from "./Todo";
import Api from "../../api/Api";

export const TodoList = types
  .model("TodoList", {
    todos: types.optional(types.array(Todo), [])
  })
  .actions(self => ({
    addTodos(todos) {
      self.todos = todos;
    },
    add: flow(function* add(title, groupId) {
      const todo = Todo.create({ id: uuid(), title });
      self.todos.push(todo);

      let idx = getRoot(self).mGroups.groups.findIndex(
        group => group.id === groupId
      );
      if (idx > -1) {
        yield getRoot(self).mGroups.groups[idx].addTodo(todo);
      }

      yield todo.send();
    }),
    remove(todo) {
      self.todos.splice(self.todos.indexOf(todo), 1);
    },
    replaceTodo(oldTodoId, todo) {
      //Get index old todo
      let idx = getRoot(self).mTodos.todos.findIndex(
        todo => todo.id === oldTodoId
      );
      //Add new Todo
      self.todos.push(todo);

      try {
        //Replace Todo in all groups in inner array todos
        getRoot(self).mGroups.groups.forEach((group, index) => {
          let todoIdx = group.todos.findIndex(todo => todo.id === oldTodoId);
          if (todoIdx > -1) {
            getRoot(self).mGroups.groups[index].replaceTodoInGroupTodos(
              todoIdx,
              todo
            );
          }
        });
      } catch (e) {
        console.log(e);
      }

      //Remove Todo in State manager
      if (idx > -1) {
        getRoot(self).mTodos.todos[idx].remove();
      }
    }
  }))
  .views(self => ({
    get listFavorities() {
      return self.todos.filter(todo => todo.isFavorite === true);
    }
  }));
