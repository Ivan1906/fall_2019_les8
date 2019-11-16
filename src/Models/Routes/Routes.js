import { types } from "mobx-state-tree";
import { Route } from "./Route";

export const Routes = types
  .model("Routes", {
    home: Route,
    favorities: Route,
    groupById: types.optional(types.array(Route), []),
    groupAdd: Route
  })
  .actions(self => ({
    addRouteGroup(name, path) {
      self.groupById.push({ name, path });
    }
  }));
