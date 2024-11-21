const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'eventsDB';

let db;

const connectDB = async () => {
  if (db) return db;
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(dbName);
  return db;
};

module.exports = connectDB;