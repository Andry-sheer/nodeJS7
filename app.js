import "./database/shutdown.db.js";
import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { setClient } from "./database/db.js";
import { setMigrations } from "./utils/set_migrations.utils.js";
import { switchPropsFunction } from "./info.js";

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

await setMigrations();
await switchPropsFunction();
await client.close();