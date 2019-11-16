import React, { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import ListItem from "../shared/Components/ListItems";
import { store } from "../../Models/RootModel";
import { values } from "mobx";
import { observer } from "mobx-react";
import HeaderItem from "../shared/Components/HeaderItem";

const TodoGroup = () => {
  const { id } = useParams();
  const group = values(store.mGroups.groups).find(el => el.id === id);

  const submitHandle = e => {
    e.preventDefault();
    let text = e.target.textTodo.value;
    if (Boolean(text)) {
      let group = values(store.mGroups.groups).find(group => group.id === id);
      if (group) {
        store.mTodos.add(text, group.id);
      }
    }
    e.target.textTodo.value = "";
  };

  return (
    <div>
      {group ? (
        <Fragment>
          <h1>{group.title}</h1>
          <hr />
          {group.todos.length !== 0 ? (
            <Fragment>
              <HeaderItem />
              <ListItem items={values(group.todos)} />
            </Fragment>
          ) : (
            <p>There are not todos for group</p>
          )}

          <hr />
          <form onSubmit={submitHandle}>
            <h3>Add Todo for Group</h3>
            <label>Todo text:</label>
            <input type="text" name="textTodo" placeholder="Enter name group" />
            <input type="submit" value="ADD TODO" />
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            <b>Group not found by params id</b>
          </p>
          <span>
            Go to <Link to="/">home page</Link>
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default observer(TodoGroup);
