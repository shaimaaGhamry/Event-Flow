const { Event, Task, User } = require("../models");
const taskResolvers = {
  Query: {

    tasks: async () => {
      return await Task.find().populate('assignedTo').populate('event');
    },

    task: async (parent, { id }) => {
      return await Task.findById(id).populate("assignedTo").populate("event");
    },
  },
  Mutation: {
    createTask: async (
      parent,
      { title, description, assignedTo, deadline, event },
      context
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authentication required.");
        }
        const task = await Task.create({
          title,
          description,
          assignedTo,
          deadline,
          event,
        });

        await User.findByIdAndUpdate(assignedTo, { $push: { tasks: task } });
        await Event.findByIdAndUpdate(event, { $push: { tasks: task } });
        return task;
      } catch (err) {
        throw new Error(err);
      }
    },

    updateTask: async (
      parent,
      { id, title, description, assignedTo, deadline, event }
    ) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required.');
        }
        // const { taskId, taskInput } = args;
        const updatedTask = await Task.findByIdAndUpdate(
          id,
          { title, description, assignedTo, deadline, event },
          { new: true }
        );
        await User.updateOne(
          { _id: updatedTask.assignedTo },
          { $push: { tasks: updatedTask._id } }
        );
        await Event.updateOne(
          { _id: updatedTask.event },
          { $push: { tasks: updatedTask._id } }
        );
        return updatedTask;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update task");
      }
    },
    
  },
};

module.exports = taskResolvers;