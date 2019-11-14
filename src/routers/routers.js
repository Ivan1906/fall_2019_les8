export const paths = {
  home: "/",
  favorities: "/favorities",
  groupById: "/groups/:id",
  groupAdd: "/groups/add"
};

export const routers = {
  home: {
    name: "Home page",
    path: paths.home
  },
  favorities: {
    name: "Favorities todos",
    path: paths.favorities
  },
  groupById: [],
  groupAdd: {
    name: "Add Group",
    path: paths.groupAdd
  }
};