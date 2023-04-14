const { Event, Task, User } = require("../models");
const taskResolvers = {
    Query: {
        
        tasks: async () => {
            return await Task.find().populate('assignedTo').populate('event');
        },

        task: async (parent, { id }) => {
            return await Task.findById(id).populate('assignedTo').populate('event');
        },
    },
   Mutation:{
    createTask: async (parent, { title, description, assignedTo, deadline, eventId }, context) => {
        if (!context.user) {
            throw new Error('Authentication required.');
        }
        const task = new Task({
            title,
            description,
            assignedTo,
            deadline,
            completed: false,
            event: eventId
        });
        await task.save();
        return task;
    },
    updateTask: async (parent, { id, title, description, assignedTo, deadline, completed, eventId }, context) => {
        if (!context.user) {
            throw new Error('Authentication required.');
        }
        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task not found.');
        }
        if (!task.assignedTo.equals(currentUser._id)) {
            throw new Error('Only the assigned user can update the task.');
        }
    }
   }
};
module.exports = taskResolvers;