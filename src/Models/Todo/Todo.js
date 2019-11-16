import { types, flow, getRoot, getParent } from "mobx-state-tree";
import Api from "../../api/Api";

export const Todo = types
  .model("Todo", {
    id: types.identifier,
    title: types.string,
    isCompleted: types.optional(types.boolean, false),
    isFavorite: types.optional(types.boolean, false),
    isTogglingCompleted: false,
    isTogglingCompletedError: false,
    isTogglingFavority: false,
    isTogglingFavorityError: false,
    isSending: false,
    isSendingError: false,
    isRemoveLoading: false,
    isRemoveError: false
  })
  .actions(self => ({
    send: flow(function* send() {
      self.isSending = true;
      self.isSendingError = false;

      try {
        const todo = yield Api.Todos.add(self);
        getRoot(self).mTodos.replaceTodo(self.id, todo);
      } catch (e) {
        console.log(e);
        self.isSendingError = true;
      } finally {
        self.isSending = false;
      }
    }),
    changeCompleted: flow(function* changeCompleted() {
      let oldValue = self.isCompleted;
      self.isTogglingCompleted = true;
      try {
        self.isCompleted = !self.isCompleted;
        yield Api.Todos.update(self.id, { isCompleted: self.isCompleted });
      } catch (e) {
        console.log(e);
        self.isCompleted = oldValue;
        self.isTogglingCompletedError = true;
      } finally {
        self.isTogglingCompleted = false;
      }
    }),
    changeFavorited: flow(function* changeFavorited() {
      let oldValue = self.isFavorite;
      self.isTogglingFavority = true;
      try {
        self.isFavorite = !self.isFavorite;
        yield Api.Todos.update(self.id, { isFavorite: self.isFavorite });
      } catch (e) {
        console.log(e);
        self.isFavorite = oldValue;
        self.isTogglingFavorityError = true;
      } finally {
        self.isTogglingFavority = false;
      }
    }),
    remove() {
      getParent(self, 2).remove(self);
    }
  }));
