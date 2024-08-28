import { Router } from 'express';
import {
  createEventController,
  getEventsController,
  getEventByIdController,
  updateEventByIdController,
  deleteEventByIdController
} from '../controllers/eventController';

const router = Router();

router.post('/events', createEventController);
router.get('/events', getEventsController);
router.get('/events/:id', getEventByIdController);
router.put('/events/:id', updateEventByIdController);
router.delete('/events/:id', deleteEventByIdController);

export default router;
