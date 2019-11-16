import { types } from "mobx-state-tree";
import { TodoList } from "./Todo/TodoList";
import { GroupList } from "./Group/GroupList";
import { Routes } from "./Routes/Routes";
import { routers, paths } from "../routers/routers";
import Api from "../api/Api";

async function run() {
  store.mTodos.addTodos(await Api.Todos.getAll());
  store.mGroups.addGroups(await Api.Groups.getAll());
  store.mGroups.groups.forEach(group => {
    store.mRoutes.addRouteGroup(
      group.title,
      paths.groupById.replace(":id", group.id)
    );
  });
}

const RootStore = types.model("RootStore", {
  mTodos: types.optional(TodoList, {}),
  mGroups: types.optional(GroupList, {}),
  mRoutes: types.optional(Routes, routers)
});
const store = RootStore.create({});

run();

export { store };
