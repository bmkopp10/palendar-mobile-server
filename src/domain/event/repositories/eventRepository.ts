import { Event } from '../models/eventModel';

export default interface EventRepository {
  createEvent(eventData: Omit<Event, '_id'>): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  updateEventById(id: string, updateData: Partial<Event>): Promise<Event | null>;
  deleteEventById(id: string): Promise<Event | null>;
}


// import { fetchEventFromDatabase } from '../daos/eventDao';
// import EventEntity from '../entities/EventEntity';

// export default class EventRepository {

//   async getEvent(): Promise<EventEntity[]> {
//     const rawData = await fetchEventFromDatabase();
//     return rawData.map((data: any) => new EventEntity(data.title, data.description));
//   }

// }
