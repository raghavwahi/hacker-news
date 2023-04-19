import React from "react";

import Stories from "../../Components/Stories/Stories";
import classes from "./Section.module.css";

const Section = () => {
  return (
    <section className={classes.section}>
      <Stories />
    </section>
  );
};

export default Section;
