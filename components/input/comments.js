import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

// Display and manage event comments
function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  // Fetch comments when they are displayed
  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments, eventId]);

  // Toggle the comments section
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  // Send a new comment to the API
  function addCommentHandler(commentData) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>

      {/* Display the comment form */}
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {/* Display all comments */}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
