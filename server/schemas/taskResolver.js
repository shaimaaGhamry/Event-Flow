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
    createTask: async (parent,{ title, description, assignedTo, deadline, event }, context) => {
      console.log("Inside CREATE TASK");
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
        })
        await task.populate('event assignedTo');
        console.log("TASK CREATED");
        const updatedUser = await User.updateOne({_id: assignedTo}, { $push: { tasks: task._id } });
        console.log("user updated");
        console.log(updatedUser);
        const updateedEvent = await Event.updateOne({_id:event}, { $push: { tasks: task._id } });
        console.log("Event updated");
        console.log(updateedEvent);
        console.log(task)
        return  task;
      } catch (err) {
        console.log(err);
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