import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://doadmin:j964W0xv831C2qdo@db-mongodb-nyc3-10354-1736305b.mongo.ondigitalocean.com/admin?retryWrites=true&w=majority'

export const connect = async () => {

  await mongoose.connect(mongoURI, {});

  console.log('MongoDB connected');
};

export const close = async () => {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
};
