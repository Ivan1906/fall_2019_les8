import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { values } from "mobx";
import { observer } from "mobx-react";
import { store } from "../Models/RootModel";

const style = {
  color: "red"
};

const Navbar = () => (
  <nav id="blockNavbar">
    {Object.keys(store.mRoutes).map((key, index) => {
      return !Array.isArray(store.mRoutes[key]) ? (
        <NavLink
          key={index}
          exact
          to={store.mRoutes[key].path}
          activeStyle={style}
        >
          {store.mRoutes[key].name}
        </NavLink>
      ) : (
        <Fragment key={index}>
          {values(store.mRoutes[key]).map((el, idx) => (
            <NavLink
              exact
              key={`subIdx=${idx}`}
              to={el.path}
              activeStyle={style}
            >
              {el.name}
            </NavLink>
          ))}
        </Fragment>
      );
    })}
  </nav>
);

export default observer(Navbar);
