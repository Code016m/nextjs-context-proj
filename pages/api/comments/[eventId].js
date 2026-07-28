import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from "../../../helpers/db-util";

// Handle requests for event comments
async function handler(req, res) {
  // Get the event id from the URL
  const eventId = req.query.eventId;

  let client;

  // Connect to the database
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  // Add a new comment
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // Validate the submitted data
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      // Store the comment in the database
      const result = await insertDocument(client, "comments", newComment);

      // Save the generated MongoDB id
      newComment._id = result.insertedId;

      // Return the created comment
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed." });
    }
  }

  // Fetch all comments for the selected event
  if (req.method === "GET") {
    try {
      const documents = await getAllDocument(
        client,
        "comments",
        { _id: -1 },
        { eventId },
      );

      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }
}

export default handler;
