const { Event, User } = require("../models");
const eventResolvers = {
    Query: {
        events: async () => {
            const events = await Event.find().populate('createdBy attendees invitees tasks');
            return events;
        },
        eventsDesc: async () => {
            const events = await Event.find().populate('createdBy attendees invitees tasks').sort({startDate:'desc'});
            return events;
        },
        eventsAsc: async () => {
            const events = await Event.find().populate('createdBy attendees invitees tasks').sort({startDate:'asc'});
            return events;
        },
        event: async (parent, { id }) => {
            console.log("INSIDE EVENT BY ID");
            const event = await Event.findById(id).populate('createdBy attendees invitees tasks');
            return event;
        },
    },
    Mutation: {
       
        createEvent: async (parent, { input }, context) => {
            console.log("=====inside create event");
            if (!context.user) {
                throw new Error('Authentication required.');
            }

           
            try{
            const event = await Event.create(input);

            await User.updateOne({ _id: event.createdBy }, { $push: { ownedEvents: event._id } });
            //await User.updateMany({ _id: { $in: event.attendees } }, { $push: { acceptedEvents: event._id } });
            await User.updateMany({ _id: { $in: event.invitees } }, { $push: { pendingEvents: event._id } });

            await event.populate('createdBy attendees invitees tasks');
            console.log(event
                );
            return event;
            }catch(error){
                console.log(error);
            }

        },
        
       acceptPendingEvent: async (parent, {eventId}, context) => {
            
            if (!context.user) {
                throw new Error('Authentication required.');
            }
            const event = await Event.findByIdAndUpdate(eventId,{
                //$pull: {invitees: context.user._id},
                $addToSet: { attendees: context.user._id },
            }, {new: true }
            );
            
            if (!event) {
                throw new Error('Event not found.');
            }
            const updateUser = await User.findByIdAndUpdate(context.user._id,{
                $pull:{pendingEvents: event._id},
                $addToSet:{acceptedEvents: event._id}},
                {new: true}
                );

                
            await updateUser.populate('pendingEvents acceptedEvents ownedEvents tasks');
                         
            return updateUser;
        },

        declineEvent: async(parent, {eventId}, context) => {
            console.log("DECLINE");
            console.log(context.user);
            if (!context.user) {
                throw new Error('Authentication required.');
            }

            const event = await Event.findByIdAndUpdate(eventId,{
                $pull:{invitees: context.user._id, 
                       attendees: context.user._id}},
                {new: true}
            );
            
            if(!event){
                throw new Error('Event not found.');
            }
            
            const updatedUser = await User.findByIdAndUpdate(context.user._id,{
                $pull: {pendingEvents: event._id,
                        acceptedEvents:event._id},
            }, 
            {new: true}).populate('pendingEvents acceptedEvents ownedEvents tasks');
            


            
            return updatedUser;
        },

        updateEvent: async (parent, { id, input }, context) => {
            if (!context.user) {
                throw new Error('Authentication required.');
            }
            const event = await Event.findById(id);
            if (!event) {
                throw new Error('Event not found.');
            }
            if (!event.createdBy.equals(context.user._id)) {
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
            if (!event.createdBy.equals(context.user._id)) {
                throw new Error('Only the owner of the event can delete it.');
            }

            const deletedEvent = await Event.findByIdAndDelete(id).populate('createdBy attendees invitees tasks');

            return deletedEvent;
        },
    }
};
module.exports = eventResolvers;
