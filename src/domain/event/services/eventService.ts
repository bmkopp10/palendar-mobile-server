import EventRepositoryImpl from '../repositories/eventRepositoryImpl';
import EventRepository from '../repositories/eventRepository';
import { Event } from '../models/eventModel';
import { getEventEmitter } from '../../../common/config/dbConfig';

export default class EventService {
  private eventRepository: EventRepository;
  private eventEmitter = getEventEmitter();

  constructor() {
    this.eventRepository = new EventRepositoryImpl();
    this.eventEmitter.on('repoChange', this.handleRepoChange.bind(this));
  }

  public async addEvent(eventData: Omit<Event, '_id'>): Promise<Event> {
    return await this.eventRepository.createEvent(eventData);
  }

  public async fetchEvents(): Promise<Event[]> {
    return await this.eventRepository.getAllEvents();
  }

  public async fetchEventById(id: string): Promise<Event | null> {
    return await this.eventRepository.getEventById(id);
  }

  public async modifyEventById(id: string, updateData: Partial<Event>): Promise<Event | null> {
    return await this.eventRepository.updateEventById(id, updateData);
  }

  public async removeEventById(id: string): Promise<Event | null> {
    return await this.eventRepository.deleteEventById(id);
  }

  async handleRepoChange(change: any) {
    console.log('Service layer handling change:', change);
    // Optionally, further processing
    this.eventEmitter.emit('serviceChange', change); // Propagate to controller
  }

}
