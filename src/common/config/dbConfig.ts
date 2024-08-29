import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import EventEmitter from 'events';

const mongoServer = new MongoMemoryServer();
const eventEmitter = new EventEmitter(); // To propagate changes through the app

export const connect = async () => {
  await mongoServer.start();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  console.log('In-memory MongoDB connected');

  const database = mongoose.connection.db;

  // Define the collections you want to listen to
  const collectionsToWatch = ['collection_one', 'collection_two', 'collection_three'];

  // Create a ChangeStream for each collection
  collectionsToWatch.forEach((collectionName) => {
    const collection = database?.collection(collectionName);
    const changeStream = collection?.watch();

    changeStream?.on('change', (change) => {
      console.log(`Change detected in ${collectionName}:`, change);
      eventEmitter.emit(`${collectionName}Change`, change); // Emit event specific to the collection
    });
  });
};

export const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('In-memory MongoDB connection closed');
};

export const getEventEmitter = () => eventEmitter; // Expose event emitter to other layers
