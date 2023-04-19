import React from "react";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <li className={classes.loader}>
      <div>
        <div className={classes["skeleton-title"]} />
        <div className={classes["skeleton-text"]} />
      </div>
    </li>
  );
};

export default Loader;
