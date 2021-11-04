const { MongoClient } = require('mongodb');
const config = require('config');
const { createReserveData } = require('./dateUtils');

const client = new MongoClient(config.get('mongoUri'));

const dbName = 'myFirstDatabase';

exports.createRoomsData = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection "rooms"
    const col = db.collection('rooms');

    // Construct a document
    let personDocument = {
      rooms: [
        {
          dates: createReserveData(),
          name: 'big',
          id: Math.random().toString(36).substr(2, 9),
        },
        {
          dates: createReserveData(),
          name: 'small',
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    };

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(personDocument);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    // console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};
