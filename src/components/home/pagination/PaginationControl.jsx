import React from "react";
import { PAGE_COUNT } from "../../../config";

import classes from "./PaginationControl.module.scss";

const PaginationControl = function () {
  const pageButtons = [];
  for (let i = 1; i < PAGE_COUNT + 1; i++) {
    // Just for testing. Remove dynamic style after.
    pageButtons.push(
      <button
        className={`${classes.btn} ${i === 4 ? classes["btn--active"] : ""}`}
        key={i}
      >
        {i}
      </button>
    );
  }

  const leftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );

  const rightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );

  return (
    <div className={classes.container}>
      <button className={`${classes.btn} ${classes["btn--prev"]}`}>
        {leftIcon}
      </button>

      {pageButtons}

      <button className={`${classes.btn} ${classes["btn--next"]}`}>
        {rightIcon}
      </button>
    </div>
  );
};

export default PaginationControl;
