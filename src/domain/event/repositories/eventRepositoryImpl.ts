import { EventEmitter } from 'events';
import EventDAO from '../daos/eventDao';
import EventRepository  from './eventRepository';
import { Event } from '../models/eventModel';
import { getEventEmitter } from '../../../common/config/dbConfig';

export default class EventRepositoryImpl implements EventRepository {

  constructor(private dao = new EventDAO(), private eventEmitter = getEventEmitter()) {
    this.eventEmitter.on('daoChange', this.handleDaoChange.bind(this)); // Subscribe to changes
  }

  async createEvent(eventData: Omit<Event, '_id'>): Promise<Event> {
    return await this.dao.createEvent(eventData);
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.dao.getAllEvents();
  }

  async getEventById(id: string): Promise<Event | null> {
    return await this.dao.getEventById(id);
  }

  async updateEventById(id: string, updateData: Partial<Event>): Promise<Event | null> {
    return await this.dao.updateEventById(id, updateData);
  }

  async deleteEventById(id: string): Promise<Event | null> {
    return await this.dao.deleteEventById(id);
  }

  async handleDaoChange(change: any) {
    console.log('Repository layer handling change:', change);
    // Optionally, apply business logic
    this.eventEmitter.emit('repoChange', change); // Propagate to services
  }

}
