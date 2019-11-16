import { types, flow, getRoot } from "mobx-state-tree";
import { Todo } from "../Todo/Todo";
import Api from "../../api/Api";

export const Group = types
  .model("Group", {
    id: types.identifier,
    title: types.string,
    todos: types.optional(types.array(types.reference(Todo)), []),
    isSendLoading: false,
    isSendError: false,
    isAddTodoLoading: false,
    isAddTodoError: false
  })
  .actions(self => ({
    send: flow(function* send() {
      self.isSendLoading = true;
      self.isSendError = false;

      try {
        const group = yield Api.Groups.add(self);
        getRoot(self).mGroups.replaceGroup(self.id, group);
      } catch (e) {
        console.log(e);
        self.isSendError = true;
      } finally {
        self.isSendLoading = false;
      }
    }),
    loadGroups() {},
    addTodo: flow(function* addTodo(todo) {
      self.isAddTodoLoading = true;
      self.isAddTodoError = false;
      try {
        yield Api.Groups.addTodo(self.id, todo);
        self.todos.push(todo);
      } catch (e) {
        console.log(e);
        self.isAddTodoError = true;
      } finally {
        self.isAddTodoLoading = false;
      }
    }),
    replaceTodoInGroupTodos: flow(function* replaceTodoInGroupTodos(idx, todo) {
      try {
        self.todos[idx] = todo.id;
        yield Api.Groups.update(self.id, { todos: self.todos });
      } catch (e) {
        console.log(e);
      }
    })
  }));
