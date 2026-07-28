import classes from "./event-content.module.css";

// Display the event description
function EventContent(props) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
