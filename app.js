import "./database/shutdown.db.js";
import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { getDb, setClient } from "./database/db.js";

const PORT = process.env.PORT || 3500;
const DB_NAME = process.env.DB_NAME;
const MDB_URI = process.env.MDB_URI || "mongodb://localhost:27017";

const client = new MongoClient(MDB_URI);

try {
  await client.connect();
  setClient(client);
  console.log("❄️ Connect to MDB successfully");
} catch (error) {
  console.error("😭 Filed to connect to MDB... ", error);
  process.exit(1);
}

const database = getDb(DB_NAME);

const getAllUsers = async () => {
  const cursor = database.collection("users").find();
  const data = await cursor.toArray();
  console.log(data);
};

await getAllUsers();
await client.close();

//! dont forget:
// 1 operations connect always must be "async"
// 2 important add shutDown for safe "close connect to MDB"
// 3 dont forget use client for setClient
// 4 dont forget use dotenv`s like PORT, MONGO_URI, and the others
// 5 dont forget use try-catch for FS, files, and connects
