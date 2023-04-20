const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    default: new Date(),
    get: (startDate) => startDate.toDateString()

  },
  endDate: {
    type: Date,
    default: new Date(),
    get: (endDate) => endDate.toDateString()

  },
  type: {
    type: String,
   required: true
  },

  isPrivate:{
    type:Boolean,
    default:false
  },
  location: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  invitees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

const Event = model("Event", eventSchema);
module.exports = Event;