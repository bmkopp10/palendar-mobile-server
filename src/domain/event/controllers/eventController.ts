import { Request, Response } from 'express';
import { validateEventRequest } from '../validators/eventValidator';
import { logger } from '../../../common/utils/logger';
import { ApiResponse, ErrorResponse } from '../../../common/types';
import { addEvent, fetchEvents, fetchEventById, modifyEventById, removeEventById } from '../services/eventService';

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

export const createEventController = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await addEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getEventsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await fetchEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEventByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await fetchEventById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const updateEventByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await modifyEventById(req.params.id, req.body);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEventByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await removeEventById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
