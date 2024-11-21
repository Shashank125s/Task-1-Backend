const express = require('express');
const multer = require('multer');
const { getEventById, getLatestEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/events', getEventById);
router.get('/events', getLatestEvents);
router.post('/events', upload.single('image'), createEvent); 
router.put('/events/:id', upload.single('image'), updateEvent); 
router.delete('/events/:id', deleteEvent);

module.exports = router;