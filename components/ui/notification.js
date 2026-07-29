import classes from "./notification.module.css";

// Display a notification message
function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = "";

  // Apply the appropriate style based on the notification status
  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  // Combine the base and status-specific styles
  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
