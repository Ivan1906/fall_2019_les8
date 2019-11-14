import React from "react";
import { Switch, Route } from "react-router-dom";
import { paths } from "../routers/routers";
import Home from "./pages/Home";
import AddGroup from "./pages/AddGroup";
import TodoGroup from "./pages/TodoGroup";
import TodoFavorites from "./pages/TodoFavorities";

function Body() {
  return (
    <section id="blockBody">
      <Switch>
        <Route exact path={paths.home} component={Home} />
        <Route path={paths.favorities} component={TodoFavorites} />
        <Route path={paths.groupAdd} component={AddGroup} />
        <Route path={paths.groupById} component={TodoGroup} />
      </Switch>
    </section>
  );
}

export default Body;
