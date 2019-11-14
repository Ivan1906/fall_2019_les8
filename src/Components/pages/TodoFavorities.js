import React, { Fragment } from "react";
import ListItem from "../shared/Components/ListItems";
import { store } from "../../Models/RootModel";
import { observer } from "mobx-react";
import HeaderItem from "../shared/Components/HeaderItem";

const TodoFavorites = () => (
  <div>
    <h1>Favorities todos</h1>
    <hr />
    {store.todos.listFavorities.length !== 0 ? (
      <Fragment>
        <HeaderItem />
        <ListItem items={store.todos.listFavorities} />
      </Fragment>
    ) : (
      <p>There are not favorities todos</p>
    )}
  </div>
);

export default observer(TodoFavorites);
