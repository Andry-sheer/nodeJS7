
import { getDb } from "../database/db.js";

export const switchArgsFunction = async () => {
  const useAction = process.argv;
  const database = await getDb(process.env.DB_NAME);
  const collection_books = database.collection('books');


  if (useAction.includes('--author')) {
    const authorsBooks = await collection_books.find({}, {projection: { author: 1, _id: 0 }}).toArray();
    console.log(authorsBooks);
    return authorsBooks;
  }
  
  else if (useAction.includes('--genre')) {
    const genresBooks = await collection_books.find({}, {projection: { genre: 1, _id: 0 }}).toArray();
    console.log(genresBooks);
    return genresBooks;
  }
  
  else if (useAction.includes('--rating=4.3')) {
    const ratingsBooks = await collection_books.find({ rating : { $gte : 4.3 } }).toArray();
    console.log(ratingsBooks);
    return ratingsBooks;
  }

  else if (useAction.includes('--tags=classical')) {
    const updateTags = await collection_books.updateMany({}, { $addToSet: {tags: "classical"}})
    console.log('updated documents:', updateTags.modifiedCount);
    return updateTags;
  }
  
  else {
    const getDocuments = await collection_books.find({},{projection: {title: 1, _id: 0}}).toArray();
    console.log(getDocuments);
    console.log('all documents:', getDocuments.length);
    console.log('node starting without args');
  }
}