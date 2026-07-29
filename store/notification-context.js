import { createContext, useState, useEffect } from "react";

// Create the notification context
const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

// Provide notification state to the application
export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  // Automatically hide success and error notifications after 3 seconds
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      // Clear the timer when the component updates or unmounts
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
