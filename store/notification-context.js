import { createContext, useState } from "react";

// Create the notification context
const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

// Provide notification state to the application
export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  // Show a new notification
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  // Hide the current notification
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
