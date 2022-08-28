import React from "react";
import classes from "./PageSelector.module.scss";
import { context } from "../../../store/main-context";
const PageSelector = function () {
  const ctx = React.useContext(context);

  const handleAll = function () {
    ctx.dispatch({ type: ctx.actions.activePage, payload: "all" });
  };
  const handleFaves = function () {
    ctx.dispatch({ type: ctx.actions.activePage, payload: "faves" });
  };

  return (
    <div className={classes["post-selector--container"]}>
      <button
        className={`${classes.btn} ${
          ctx.state.activePage === "all" ? classes["btn--active"] : ""
        }`}
        onClick={handleAll}
      >
        All
      </button>
      <button
        className={`${classes.btn} ${
          ctx.state.activePage === "faves" ? classes["btn--active"] : ""
        }`}
        onClick={handleFaves}
      >
        My faves
      </button>
    </div>
  );
};

export default PageSelector;
