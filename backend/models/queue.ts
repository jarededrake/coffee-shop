import { Double } from 'mongodb';
import { Schema, model } from 'mongoose';

const queueSchema = new Schema({
  name: {
    type: String,
  },
  nameOfCurrentShopper: {
    type: String,
  },
  numberWaiting: {
    type: Number,
  },
  numberAhead: {
    type: Number
  }
});

const Queue = model('User', queueSchema);
export default Queue;

