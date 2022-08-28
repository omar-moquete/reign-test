import React from "react";
import PageSelector from "./page-selector/PageSelector";
import classes from "./Home.module.scss";
import Posts from "./posts/Posts";
import { context } from "../../store/main-context";

const Home = function () {
  return (
    <div className={classes.home}>
      <PageSelector />
      <Posts />
    </div>
  );
};

export default Home;
