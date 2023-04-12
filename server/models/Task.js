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
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
});

const Task = model('Task', taskSchema);
module.exports = Task;
