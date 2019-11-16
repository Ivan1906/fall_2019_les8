import uuid from "uuid/v4";
import { types, flow, getRoot } from "mobx-state-tree";
import { Group } from "./Group";
import { paths } from "../../routers/routers";
import { values } from "mobx";

export const GroupList = types
  .model("GroupList", {
    groups: types.optional(types.array(Group), [])
  })
  .actions(self => ({
    addGroups(groups) {
      self.groups = groups;
    },
    add: flow(function* add(title) {
      const group = Group.create({ id: uuid(), title });

      self.groups.push(group);
      getRoot(self).mRoutes.addRouteGroup(
        group.title,
        paths.groupById.replace(":id", group.id)
      );

      yield group.send();
    }),
    replaceGroup(oldGroupId, newGroup) {
      let idx = values(self.groups).findIndex(group => group.id === oldGroupId);

      //change group
      newGroup.todos = values(self.groups[idx].todos);
      if (idx > -1) {
        self.groups[idx] = newGroup;
      }

      //change path route for new id
      let route = getRoot(self).mRoutes.groupById.find(
        route => route.path.substring(8) === oldGroupId
      );

      if (route) {
        let newPath = route.path.replace(oldGroupId, newGroup.id);
        route.changePath(newPath);
      }
    }
  }));
