const { ObjectId } = require('mongodb');
const connectDB = require('../models/db');

const getEventById = async (req, res) => {
  const db = await connectDB();
  const event = await db.collection('events').findOne({ _id: ObjectId(req.query.id) });
  res.json(event);
};

const getLatestEvents = async (req, res) => {
  const { limit, page } = req.query;
  const db = await connectDB();
  const events = await db.collection('events')
    .find({})
    .sort({ schedule: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .toArray();
  res.json(events);
};

const createEvent = async (req, res) => {
  const db = await connectDB();
  const event = req.body;
  if (req.file) {
    event.image = req.file.path; 
  }
  const result = await db.collection('events').insertOne(event);
  res.json({ id: result.insertedId });
};

const updateEvent = async (req, res) => {
  const db = await connectDB();
  const event = req.body;
  if (req.file) {
    event.image = req.file.path; 
  }
  await db.collection('events').updateOne({ _id: ObjectId(req.params.id) }, { $set: event });
  res.json({ message: 'Event updated' });
};

const deleteEvent = async (req, res) => {
  const db = await connectDB();
  await db.collection('events').deleteOne({ _id: ObjectId(req.params.id) });
  res.json({ message: 'Event deleted' });
};

module.exports = { getEventById, getLatestEvents, createEvent, updateEvent, deleteEvent };