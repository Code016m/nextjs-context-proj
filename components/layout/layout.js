import { Fragment, useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

// Wrap every page with the main layout
function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />

      {/* Render the current page content */}
      <main>{props.children}</main>

      {/* Display a notification when available */}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
