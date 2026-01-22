import './database/shutdown.db.js';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const PORT = process.env.PORT || 3500;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient()
// const database = 