import React from "react";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={classes.title}>Hacker News</h1>
    </header>
  );
};

export default Header;
