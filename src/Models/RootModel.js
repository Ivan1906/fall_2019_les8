import { types } from "mobx-state-tree";
import { TodoList } from "./Todo/TodoList";
import { GroupList } from "./Group/GroupList";
import { Routers } from "./Routers/Routers";
import { routers } from "../routers/routers";

const RootStore = types.model("RootStore", {
  todos: types.optional(TodoList, {}),
  groups: types.optional(GroupList, {}),
  routers: types.optional(Routers, routers)
});

export const store = RootStore.create({});
