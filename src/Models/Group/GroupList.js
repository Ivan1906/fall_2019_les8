import uuid from "uuid/v4";
import { types, flow, getRoot } from "mobx-state-tree";
import { Group } from "./Group";
import { paths } from "../../routers/routers";

export const GroupList = types
  .model("GroupList", {
    groups: types.optional(types.array(Group), [])
  })
  .actions(self => ({
    add: flow(function* add(title) {
      const group = Group.create({ id: uuid(), title });

      self.groups.push(group);
      getRoot(self).routers.addRouteGroup(
        group.title,
        paths.groupById.replace(":id", group.id)
      );
      yield group.send();
    }),
    replaceGroup(oldGroupId, group) {
      let idx = self.groups.findIndex(group => group.id === oldGroupId);
      if (idx > -1) {
        self.groups[idx] = group;

        let route = getRoot(self).routers.groupById.find(
          route => route.path.substring(8) === oldGroupId
        );

        if (route) {
          let newPath = route.path.replace(oldGroupId, group.id);
          route.changePath(newPath);
        }
      }
    }
  }));
