import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

// Form for adding a new comment
function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  // References to the form inputs
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  // Handle comment submission
  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    // Validate the user input
    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    // Pass the comment data to the parent component
    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>

      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>

      {isInvalid && <p>Please enter a valid email address and comment!</p>}

      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewComment;
