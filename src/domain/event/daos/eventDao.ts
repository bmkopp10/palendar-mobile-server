import { EventModel, Event } from '../models/eventModel';

export const createEvent = async (eventData: Omit<Event, '_id'>): Promise<Event> => {
  const event = new EventModel(eventData);
  return await event.save();
};

export const getAllEvents = async (): Promise<Event[]> => {
  return await EventModel.find().exec();
};

export const getEventById = async (id: string): Promise<Event | null> => {
  return await EventModel.findById(id).exec();
};

export const updateEventById = async (id: string, updateData: Partial<Event>): Promise<Event | null> => {
  return await EventModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const deleteEventById = async (id: string): Promise<Event | null> => {
  return await EventModel.findByIdAndDelete(id).exec();
};
