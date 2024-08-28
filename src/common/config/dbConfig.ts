import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Initialize MongoMemoryServer
const mongoServer = new MongoMemoryServer();

export const connect = async () => {
  // Ensure the server is started
  await mongoServer.start();

  // Get the URI for connecting to MongoDB
  const uri = mongoServer.getUri();
  
  // Connect to MongoDB using Mongoose
  await mongoose.connect(uri, {
    // Use default options for the latest Mongoose versions
  });

  console.log('In-memory MongoDB connected');
};

export const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('In-memory MongoDB connection closed');
};


// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// const mongoServer = new MongoMemoryServer();

// export const connect = async () => {
//   const uri = await mongoServer.getUri();
//   await mongoose.connect(uri, {});
//   console.log('In-memory MongoDB connected');
// };

// export const close = async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// };
