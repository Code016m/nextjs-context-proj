import Link from "next/link";

import classes from "./button.module.css";

// Reusable button component
function Button(props) {
  // Render a link if a destination is provided
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
