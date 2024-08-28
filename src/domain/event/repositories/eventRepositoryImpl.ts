import { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById } from '../daos/eventDao';
import { EventRepository } from './eventRepository';
import { Event } from '../models/eventModel';

export class EventRepositoryImpl implements EventRepository {
  async createEvent(eventData: Omit<Event, '_id'>): Promise<Event> {
    return await createEvent(eventData);
  }

  async getAllEvents(): Promise<Event[]> {
    return await getAllEvents();
  }

  async getEventById(id: string): Promise<Event | null> {
    return await getEventById(id);
  }

  async updateEventById(id: string, updateData: Partial<Event>): Promise<Event | null> {
    return await updateEventById(id, updateData);
  }

  async deleteEventById(id: string): Promise<Event | null> {
    return await deleteEventById(id);
  }
}
