import { EventRepositoryImpl } from '../repositories/eventRepositoryImpl';
import { EventRepository } from '../repositories/eventRepository';
import { Event } from '../models/eventModel';

const eventRepository: EventRepository = new EventRepositoryImpl();

export const addEvent = async (eventData: Omit<Event, '_id'>): Promise<Event> => {
  return await eventRepository.createEvent(eventData);
};

export const fetchEvents = async (): Promise<Event[]> => {
  return await eventRepository.getAllEvents();
};

export const fetchEventById = async (id: string): Promise<Event | null> => {
  return await eventRepository.getEventById(id);
};

export const modifyEventById = async (id: string, updateData: Partial<Event>): Promise<Event | null> => {
  return await eventRepository.updateEventById(id, updateData);
};

export const removeEventById = async (id: string): Promise<Event | null> => {
  return await eventRepository.deleteEventById(id);
};
