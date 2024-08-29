import { getEventEmitter } from '../../../common/config/dbConfig';
import { EventModel, Event } from '../models/eventModel';

export default class EventDAO {
  private eventEmitter;

  constructor() {
    this.eventEmitter = getEventEmitter();
    this.eventEmitter.on('dbChange', this.handleDbChange.bind(this)); // Subscribe to changes
  }

  public async createEvent(eventData: Omit<Event, '_id'>): Promise<Event> {
    const event = new EventModel(eventData);
    return await event.save();
  }

  public async getAllEvents(): Promise<Event[]> {
    return await EventModel.find().exec();
  }

  public async getEventById(id: string): Promise<Event | null> {
    return await EventModel.findById(id).exec();
  }

  public async updateEventById(id: string, updateData: Partial<Event>): Promise<Event | null> {
    return await EventModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  public async deleteEventById(id: string): Promise<Event | null> {
    return await EventModel.findByIdAndDelete(id).exec();
  }

  private handleDbChange(change: any): void {
    console.log('DAO layer handling change:', change);
    // Optionally, transform or filter the change before propagating
    this.eventEmitter.emit('daoChange', change); // Propagate to repository
  }
}