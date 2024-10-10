import express from 'express';
import locationController from '../controllers/locations.js';
import eventController from '../controllers/events.js';


const router = express.Router();

router.get('/', locationController.getLocations);

router.get('/events', eventController.getEvents);

router.get('/events/:id', eventController.getEventsByLocation);

export default router;