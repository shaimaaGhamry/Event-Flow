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
        

        createEvent: async (parent, { input }, context) => {
            if (!context.user) {
                throw new Error('Authentication required.');
            }

           
            try{
            const event = await Event.create(input);

            await User.updateOne({ _id: event.createdBy }, { $push: { ownedEvents: event._id } });
            //add the event to the accepted events of the user
            await User.updateOne({ _id: event.createdBy }, { $push: { acceptedEvents: event._id } });
            
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
            //to update the invitees, i should remove the event from all the old invitees and then add the event to new invitess
            //the event owner will never delete invitee .. he just add
           // await user.findByIdAndUpdate({_id:{$in: event.invitees}},  {$pull:{pendingEvents: event._id}});

            const updatedEvent = await Event.findByIdAndUpdate(id, input, { new: true }).populate('createdBy attendees invitees tasks');
            await User.updateMany({ _id: { $in: updatedEvent.invitees } }, { $push: { pendingEvents: updatedEvent._id } });

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
            console.log(event.invitees);
            await User.updateOne({_id: event.createdBy}, {$pull: {ownedEvents: event._id}});
            await User.updateMany({_id: {$in: event.invitees}}, {$pull: {pendingEvents: event._id}});
            await User.updateMany({_id: {$in: event.attendees}}, {$pull: {acceptedEvents: event._id}});

            const deletedEvent = await Event.findByIdAndDelete(id).populate('createdBy attendees invitees tasks');
            
            return deletedEvent;
        },
    }
};
module.exports = eventResolvers;

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