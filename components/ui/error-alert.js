import classes from "./error-alert.module.css";

// Display an error message
function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
