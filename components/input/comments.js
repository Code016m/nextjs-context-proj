import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

// Display and manage event comments
function Comments(props) {
  const { eventId } = props;

  // Access notification functions from the context
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [fetchingComments, setFetchingComments] = useState(false);

  // Fetch comments when the comments section is opened
  useEffect(() => {
    if (showComments) {
      setFetchingComments(true);

      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setFetchingComments(false);
        });
    }
  }, [showComments, eventId]);

  // Show or hide the comments section
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  // Send a new comment to the API
  function addCommentHandler(commentData) {
    // Show a pending notification while saving the comment
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being saved into a database.",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // Continue if the request was successful
        if (response.ok) {
          return response.json();
        }

        // Throw the error returned by the API
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        // Show a success notification
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>

      {/* Show the comment form */}
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {/* Show comments after loading is complete */}
      {showComments && !fetchingComments && <CommentList items={comments} />}

      {/* Show loading state while fetching comments */}
      {showComments && fetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
