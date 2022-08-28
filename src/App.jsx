import React from "react";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { context } from "./store/main-context";
import classes from "./App.module.scss";
console.log("😁 By Omar Moquete!");
function App() {
  const ctx = React.useContext(context);

  return (
    <div className={classes.container} onClick={ctx.closeDropdown}>
      <Header />
      <Home />
    </div>
  );
}

export default App;
