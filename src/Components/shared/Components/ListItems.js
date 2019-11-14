import React from "react";
import Item from "./Item";
import { observer } from "mobx-react";
import T from "prop-types";

const ListItems = ({ items }) => (
  <ul className="listItem">
    {items.map(item => {
      return <Item key={item.id} item={item} />;
    })}
  </ul>
);

ListItems.defaulProps = {
  items: []
};
ListItems.displayName = "ListItems";
ListItems.propTypes = {
  items: T.array.isRequired
};

export default observer(ListItems);
