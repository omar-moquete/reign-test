import React from "react";
import classes from "./PostsFilter.module.scss";
import allIconUrl from "../../../assets/img/all.svg";
import angularLogoUrl from "../../../assets/img/angular-logo.png";
import reactjsLogoUrl from "../../../assets/img/reactjs-logo.png";
import vuejsLogoUrl from "../../../assets/img/vuejs-logo.png";
import { context } from "../../../store/main-context";

const PostsFilter = function () {
  const ctx = React.useContext(context);

  const handleSelection = function (e) {
    if (e.target.id === "all")
      ctx.dispatch({ type: ctx.actions.activeOption, payload: "all" });
    if (e.target.id === "angular")
      ctx.dispatch({ type: ctx.actions.activeOption, payload: "angular" });
    if (e.target.id === "reactjs")
      ctx.dispatch({ type: ctx.actions.activeOption, payload: "reactjs" });
    if (e.target.id === "vuejs")
      ctx.dispatch({ type: ctx.actions.activeOption, payload: "vuejs" });
  };

  const dispatchAllPosts = function () {
    ctx.dispatch({ type: ctx.actions.showPosts, payload: "all" });
  };
  const dispatchAgularPosts = function () {
    ctx.dispatch({ type: ctx.actions.showPosts, payload: "angular" });
  };
  const dispatchReactjsPosts = function () {
    ctx.dispatch({ type: ctx.actions.showPosts, payload: "reactjs" });
  };
  const dispatchVuejsPosts = function () {
    ctx.dispatch({ type: ctx.actions.showPosts, payload: "vuejs" });
  };

  return (
    <div className={classes.filter}>
      <div className={classes.selector} ref={ctx.filterRef}>
        {ctx.state.activeOption === "all" ? (
          <div className={classes["all--container"]} id="all">
            <img className={classes["all--image"]} src={allIconUrl} />
            <p>All</p>
          </div>
        ) : (
          ""
        )}
        {ctx.state.activeOption === "angular" ? (
          <div className={classes["option-selection"]}>
            <img src={angularLogoUrl} alt="Angular logo" />
            <p>Angular</p>
          </div>
        ) : (
          ""
        )}
        {ctx.state.activeOption === "reactjs" ? (
          <div className={classes["option-selection"]}>
            <img src={reactjsLogoUrl} alt="Reactjs logo" />
            <p>Reactjs</p>
          </div>
        ) : (
          ""
        )}
        {ctx.state.activeOption === "vuejs" ? (
          <div className={classes["option-selection"]}>
            <img src={vuejsLogoUrl} alt="Vuejs logo" />
            <p>Vuejs</p>
          </div>
        ) : (
          ""
        )}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      <div
        className={`${classes.dropdown} ${
          ctx.dropdownIsActive ? classes.active : ""
        } ${ctx.dropdownIsHidden ? classes.hidden : ""}`}
        onClick={handleSelection}
      >
        <div className={classes.option} id="all" onClick={dispatchAllPosts}>
          <img className={classes["all--image"]} src={allIconUrl} />
          <p>All</p>
        </div>
        <div
          className={classes.option}
          id="angular"
          onClick={dispatchAgularPosts}
        >
          <img src={angularLogoUrl} alt="Angular logo" />
          <p>Angular</p>
        </div>
        <div
          className={classes.option}
          id="reactjs"
          onClick={dispatchReactjsPosts}
        >
          <img src={reactjsLogoUrl} alt="Reactjs Logo" />
          <p>Reactjs</p>
        </div>
        <div className={classes.option} id="vuejs" onClick={dispatchVuejsPosts}>
          <img src={vuejsLogoUrl} alt="Vuejs Logo" />
          <p>Vuejs</p>
        </div>
      </div>
    </div>
  );
};

export default PostsFilter;
