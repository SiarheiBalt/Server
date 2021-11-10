const { MongoClient } = require('mongodb');
const config = require('config');
const { createReserveData } = require('./date.utils');

const client = new MongoClient(config.get('mongoUri'));

const dbName = 'myFirstDatabase';

exports.createRoomsData = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection "rooms"
    const colRecords = db.collection('records');
    const colRooms = db.collection('rooms');

    // Construct a document
    let rooms = [
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
    ];

    let records = [
      {
        dates: createReserveData(),
        name: 'solo',
        id: Math.random().toString(36).substr(2, 9),
      },
      {
        dates: createReserveData(),
        name: 'live',
        id: Math.random().toString(36).substr(2, 9),
      },
    ];

    await colRooms.insertMany(rooms);
    await colRecords.insertMany(records);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};
