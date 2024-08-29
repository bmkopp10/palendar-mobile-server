import { Router } from 'express';
import EventController from '../controllers/eventController';

const router = Router();
const eventController = new EventController()

router.post('/events', eventController.createEventController);
router.get('/events', eventController.getEventsController);
router.get('/events/:id', eventController.getEventByIdController);
router.put('/events/:id', eventController.updateEventByIdController);
router.delete('/events/:id', eventController.deleteEventByIdController);

export default router;
