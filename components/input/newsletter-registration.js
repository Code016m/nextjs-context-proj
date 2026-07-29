import { useRef, useContext } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

// Newsletter registration component
function NewsletterRegistration() {
  // Reference to access the email input value
  const emailInputRef = useRef();

  // Access notification functions from the context
  const notificationCtx = useContext(NotificationContext);

  // Handle newsletter form submission
  function registrationHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email entered by the user
    const enteredEmail = emailInputRef.current.value;

    // Show a pending notification while the request is being processed
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    // Send the email to the API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Continue if the request was successful
        if (response.ok) {
          return response.json();
        }

        // Extract and throw the error returned by the API
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        // Show a success notification
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        // Show an error notification
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>

      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />

          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
