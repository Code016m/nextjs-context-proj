import { MongoClient } from "mongodb";

// Connect to the MongoDB database
export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Test_Code:NEsgGJVgoTaN4we0@cluster0.awonqel.mongodb.net/events?retryWrites=true&w=majority",
  );

  return client;
}

// Insert a document into the specified collection
export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

// Retrieve documents from a collection
export async function getAllDocument(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
