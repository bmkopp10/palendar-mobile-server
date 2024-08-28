import mongoose, { Document, Schema } from 'mongoose';

// Define the Event interface
export interface Event extends Document {
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

// Define the Event schema
const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create the Event model
export const EventModel = mongoose.model<Event>('Event', eventSchema);