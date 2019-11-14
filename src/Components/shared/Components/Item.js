import React from "react";
import { observer } from "mobx-react";
import T from "prop-types";

const Item = ({ item }) => (
  <div id={item.id} className="item">
    <input
      type="checkbox"
      onClick={item.changeCompleted}
      defaultChecked={item.isCompleted ? "checked" : ""}
    />

    <span className={item.isCompleted ? "completedTodo" : ""}>
      {item.title}
    </span>

    <input
      type="checkbox"
      onClick={item.changeFavorited}
      defaultChecked={item.isFavorite ? "checked" : ""}
    />
  </div>
);

Item.defaulProps = {
  item: {
    id: "idTodo",
    title: "Name Todo",
    isCompleted: false,
    isFavorite: false,
    changeCompleted: () =>
      console.log("The 'changeCompleted' function must be passed!"),
    changeFavorited: () =>
      console.log("The 'changeFavorited' function must be passed!")
  }
};
Item.displayName = "Item";
Item.propTypes = {
  item: T.shape({
    id: T.string.isRequired,
    title: T.string.isRequired,
    isCompleted: T.bool.isRequired,
    isFavorite: T.bool.isRequired,
    changeCompleted: T.func.isRequired,
    changeFavorited: T.func.isRequired
  })
};

export default observer(Item);
