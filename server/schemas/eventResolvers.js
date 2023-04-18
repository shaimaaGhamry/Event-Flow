const { Event, User } = require("../models");
const eventResolvers = {
    Query: {
        events: async () => {
            const events = await Event.find().populate('createdBy attendees invitees tasks');
            return events;
        },

        event: async (parent, { id }) => {
            const event = await Event.findById(id).populate('createdBy attendees invitees tasks');
            return event;
        },
    },
    Mutation: {
        // createEvent: async (parent, { title, description, startDate, endDate, type, location , isPrivate,  invitees, attendees, tasks}, context) => {

        //     if (!context.user) {
        //         throw new Error('Authentication required.');
        //     }
        //     const event = new Event({
        //         title,
        //         description,
        //         startDate,
        //         endDate,
        //         type,
        //         location,
        //         isPrivate,
        //         createdBy: context.user._id,
        //         attendees,
        //         invitees,                
        //         tasks
        //     });
        //     await event.save();
        //     return event;
        // },

        createEvent: async (parent, { input }, context) => {
            if (!context.user) {
                throw new Error('Authentication required.');
            }

           
            try{
            const event = await Event.create(input);

            await User.updateOne({ _id: event.createdBy }, { $push: { ownedEvents: event._id } });
            await User.updateMany({ _id: { $in: event.attendees } }, { $push: { acceptedEvents: event._id } });
            await User.updateMany({ _id: { $in: event.invitees } }, { $push: { pendingEvents: event._id } });

            await event.populate('createdBy attendees invitees tasks');
            console.log(event
                );
            return event;
            }catch(error){
                console.log(error);
            }

        },
        
        // updateEvent: async (parent, { id,  title, description, startDate, endDate, type, location , isPrivate,  invitees, attendees, tasks }, context) => {
        //     if (!context.user) {
        //         throw new Error('Authentication required.');
        //     }

        //     const event = await Event.findById(id);
        //     if (!event) {
        //         throw new Error('Event not found.');
        //     }
        //     if (!event.createdBy.equals(currentUser._id)) {
        //         throw new Error('Only the owner of the event can update it.');
        //     }
        //     if (title) {
        //         event.title = title;
        //     }
        //     if (description) {
        //         event.description = description;
        //     }
        //     if (startDate) {
        //         event.startDate = startDate;
        //     }
        //     if (endDate) {
        //         event.endDate = endDate;
        //     }

        //     if (type){
        //         event.type = type;
        //     }
        //     if (location) {
        //         event.location = location;
        //     }
        //     if(invitees){
        //         event.invitees = invitees
        //     }

        //     await event.save();
        //     return event;
        // },

        updateEvent: async (parent, { id, input }, context) => {
            if (!context.user) {
                throw new Error('Authentication required.');
            }
            const event = await Event.findById(id);
            if (!event) {
                throw new Error('Event not found.');
            }
            if (!event.owner.equals(context.user._id)) {
                throw new Error('Only the owner of the event can update it.');
            }
            const updatedEvent = await Event.findByIdAndUpdate(id, input, { new: true }).populate('createdBy attendees invitees tasks');
            return updatedEvent;
        },


        deleteEvent: async (parent, { id }, context) => {
            if (!context.user) {
                throw new Error('Authentication required.');
            }
            const event = await Event.findById(id);
            if (!event) {
                throw new Error('Event not found.');
            }
            if (!event.owner.equals(context.user._id)) {
                throw new Error('Only the owner of the event can delete it.');
            }

            const deletedEvent = await Event.findByIdAndDelete(id).populate('createdBy attendees invitees tasks');

            return deletedEvent;
        },
    }
};
module.exports = eventResolvers;
