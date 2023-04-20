const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: Date,
    default: new Date(),
    get: (deadline) => deadline.toDateString()

  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});
const Task = model('Task', taskSchema);

module.exports = Task; 