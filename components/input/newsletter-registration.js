import { useRef } from "react";

import classes from "./newsletter-registration.module.css";

// Newsletter registration component
function NewsletterRegistration() {
  // Reference to access the email input value
  const emailInputRef = useRef();

  // Handle newsletter form submission
  function registrationHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email entered by the user
    const enteredEmail = emailInputRef.current.value;

    // Send the email to the API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
