import React from "react";

import classes from "./Story.module.css";

const Story = React.forwardRef((props, ref) => {
  return (
    <li className={classes.story} ref={ref}>
      <a href={props.url}>
        <p className={classes.title}>{props.title}</p>
        <p>{`${props.lastPublished} minutes ago by ${props.by}`}</p>
      </a>
    </li>
  );
});

export default Story;
