import { connectDatabase, insertDocument } from "../../helpers/db-util";

// Handle newsletter registration requests
async function handler(req, res) {
  // Process only POST requests
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // Validate the submitted email
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    // Connect to the database
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    // Store the email in the newsletter collection
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // Return a success response
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
