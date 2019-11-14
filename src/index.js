import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import { store } from "./Models/RootModel";
import { onSnapshot } from "mobx-state-tree";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Navbar />
      <Body />
    </div>
  </BrowserRouter>
);

onSnapshot(store, snapshot => console.log(snapshot));

const ObserverApp = observer(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<ObserverApp />, rootElement);
