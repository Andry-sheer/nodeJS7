import { getDb } from "../database/db.js";
import { getLocalFiles } from "./get_files.utils.js";

export const setMigrations = async () => {

  const database = await getDb(process.env.DB_NAME);
  const collection_books = database.collection('books');
  const collection_migrations = database.collection('migrations');

  try {
    const dataBooks = await collection_books.findOne();

    if (!dataBooks) {
      const allBooks = await getLocalFiles();
      const insertedBooks = await collection_books.insertMany(allBooks);
      console.log(insertedBooks);

      const migrations = await collection_migrations.insertOne({
        file: "books.json",
        quantity: insertedBooks.insertedCount,
        time: new Date()
      })

    console.log(migrations);
  } else {
    console.log('all documents were uploaded and migrated!');
  }

  } catch (error) {
    console.error("error", error.message);
    throw error
  }
}