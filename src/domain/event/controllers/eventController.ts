// TODO: add this pattern
// export const getEventController = async (req: Request, res: Response) => {
//   try {
//     validateEventRequest(req);
//     const eventService = new EventService();
//     const event = await eventService.getEvent();
//     const response: ApiResponse<typeof event> = {
//         success: true,
//         data: event,
//       };
//     res.json(response);
//   } catch (error) {
//     logger('error in fetching event data => ' + JSON.stringify(error));
//     const response: ErrorResponse = {
//         success: false,
//         message: 'Something went wrong',
//     };
//     res.status(500).json(response);
//   }
// };

import { Request, Response } from 'express';
import { logger } from '../../../common/utils/logger';
import { ApiResponse, ErrorResponse } from '../../../common/types';
import EventService from '../services/eventService';
import { getEventEmitter } from '../../../common/config/dbConfig';
import { broadcast } from '../../../common/config/websocketConfig';

export default class EventController {

  private eventService = new EventService()
  private eventEmitter = getEventEmitter();

  constructor() {
    this.eventEmitter.on('serviceChange', this.handleServiceChange.bind(this)); // Subscribe to changes
  }

  async handleServiceChange(change: any) {
    console.log('Controller layer handling change:', change);
    broadcast(change);
  }

  public async createEventController(req: Request, res: Response): Promise<void> {
    try {
      const event = await this.eventService.addEvent(req.body);
      const response: ApiResponse<typeof event> = {
        success: true,
        data: event,
      };
      res.status(201).json(response);
    } catch (error) {
      logger('error in creating event => ' + JSON.stringify(error));
      const response: ErrorResponse = {
        success: false,
        message: 'Failed to create event',
      };
      res.status(500).json(response);
    }
  }

  public async getEventsController(req: Request, res: Response): Promise<void> {
    try {
      const events = await this.eventService.fetchEvents();
      const response: ApiResponse<typeof events> = {
        success: true,
        data: events,
      };
      res.status(200).json(response);
    } catch (error) {
      logger('error in fetching events => ' + JSON.stringify(error));
      const response: ErrorResponse = {
        success: false,
        message: 'Failed to fetch events',
      };
      res.status(500).json(response);
    }
  }

  public async getEventByIdController(req: Request, res: Response): Promise<void> {
    try {
      const event = await this.eventService.fetchEventById(req.params.id);
      if (event) {
        const response: ApiResponse<typeof event> = {
          success: true,
          data: event,
        };
        res.status(200).json(response);
      } else {
        const response: ErrorResponse = {
          success: false,
          message: 'Event not found',
        };
        res.status(404).json(response);
      }
    } catch (error) {
      logger('error in fetching event by ID => ' + JSON.stringify(error));
      const response: ErrorResponse = {
        success: false,
        message: 'Failed to fetch event',
      };
      res.status(500).json(response);
    }
  }

  public async updateEventByIdController(req: Request, res: Response): Promise<void> {
    try {
      const event = await this.eventService.modifyEventById(req.params.id, req.body);
      if (event) {
        const response: ApiResponse<typeof event> = {
          success: true,
          data: event,
        };
        res.status(200).json(response);
      } else {
        const response: ErrorResponse = {
          success: false,
          message: 'Event not found',
        };
        res.status(404).json(response);
      }
    } catch (error) {
      logger('error in updating event by ID => ' + JSON.stringify(error));
      const response: ErrorResponse = {
        success: false,
        message: 'Failed to update event',
      };
      res.status(500).json(response);
    }
  }

  public async deleteEventByIdController(req: Request, res: Response): Promise<void> {
    try {
      const event = await this.eventService.removeEventById(req.params.id);
      if (event) {
        const response: ApiResponse<typeof event> = {
          success: true,
          data: event,
        };
        res.status(200).json(response);
      } else {
        const response: ErrorResponse = {
          success: false,
          message: 'Event not found',
        };
        res.status(404).json(response);
      }
    } catch (error) {
      logger('error in deleting event by ID => ' + JSON.stringify(error));
      const response: ErrorResponse = {
        success: false,
        message: 'Failed to delete event',
      };
      res.status(500).json(response);
    }
  }
}