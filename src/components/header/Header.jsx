import React from "react";
import "./Header.module.scss";
import headerImageUrl from "../../assets/img/hacker-news.svg";

const Header = function () {
  return (
    <header>
      <img src={headerImageUrl} />
    </header>
  );
};

export default Header;
