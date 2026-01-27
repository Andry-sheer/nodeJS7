
import { getDb } from "../database/db.js";

export const switchArgsFunction = async () => {
  const nodeArgs = process.argv.slice(2);
  const useNodeArgs = nodeArgs[0];
  const database = await getDb(process.env.DB_NAME);
  const collection_books = database.collection('books');

  if (useNodeArgs === '--author') {
    const authorsBooks = await collection_books.find({}, {projection: { author: 1, _id: 0 }}).toArray();
    console.log(authorsBooks);
  }
  
  else if (useNodeArgs === '--genre') {
    const genresBooks = await collection_books.find({}, {projection: { genre: 1, _id: 0 }}).toArray();
    console.log(genresBooks);
  }
  
  else if (useNodeArgs.startsWith('--rating=')) {
    const setRating = useNodeArgs.slice(9);
    const parseSetRatingToNumber = +setRating;
    
    const ratingsBooks = await collection_books.find({ rating : { $gte : parseSetRatingToNumber } }).toArray();

    if (ratingsBooks.length === 0) {
      console.log(`not found books with rating: ${parseSetRatingToNumber}`);
    } else {
      console.log(ratingsBooks);
    }
  }

  else if (useNodeArgs.startsWith('--tags=')) {
    const setTag = useNodeArgs.slice(7);
    const updateTags = await collection_books.updateMany({}, { $addToSet: {tags: setTag}})
    console.log('updated documents:', updateTags.modifiedCount);
  }
  
  else {
    const getDocuments = await collection_books.find({},{projection: {title: 1, _id: 0}}).toArray();
    console.log(getDocuments);
    console.log('all documents:', getDocuments.length);
    console.log('node starting without args');
  }
}