const { MongoClient } = require('mongodb');
const config = require('config');
const { createReserveData } = require('./date.utils');

const client = new MongoClient(config.get('mongoUri'));

const dbName = 'myFirstDatabase';

const { instruments } = require('./InstrumentsinitData');

const createDB = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    const colRecords = db.collection('records');
    const colRooms = db.collection('rooms');
    const colInstruments = db.collection('instruments');

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
    await colInstruments.insertMany(instruments);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

createDB();
