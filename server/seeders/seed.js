const db = require('../config/connection');
const { User, Event, Task } = require('../models');
const userSeeds = require('./userSeeds.json');
const eventSeeds = require('./eventSeeds.json');
const taskSeeds = require('./taskSeeds.json');

db.once('open', async () => {
    try{
        await User.deleteMany({});
        await Event.deleteMany({});
        await Task.deleteMany({});

const sampleUser = await User.create(userSeeds);
// const events = await Event.create(eventSeeds);



const events = await Event.insertMany([{
    "name": "Ladies hangout",
        "description": "A time to relax and have fun at a beach resort",
        "startDate": "May 11, 2023",
        "endDate": "May 12, 2023",
        "isPrivate": "true",
        "location": "800 Gauvin Rd, Moncton NB E1A 1N1",
        "type": "Trip",
        "createdBy": sampleUser[0],
        "attendees": [sampleUser[0], sampleUser[1]],
        "invitees": [sampleUser[0], sampleUser[1], sampleUser[2]],
        "tasks": [tasks[0], tasks[1]]
},
{
    "name": "Movie night",
        "description": "A time to see a movie at a cinema",
        "startDate": "May 5, 2023",
        "endDate": "May 6, 2023",
        "isPrivate": "true",
        "location": "Cineplex, 800 Champlain Rd, Moncton NB E1A 5D3",
         "type": "Proposal",
         "createdBy": sampleUser[1],
         "attendees": [sampleUser[1], sampleUser[2]],
         "invitees": [sampleUser[0], sampleUser[1], sampleUser[2]],
         "tasks": [tasks[0], tasks[1]]
},
{
    "name": "Movie night",
        "description": "A time to see a movie at a cinema",
        "startDate": "May 5, 2023",
        "endDate": "May 6, 2023",
        "isPrivate": "true",
        "location": "Cineplex, 800 Champlain Rd, Moncton NB E1A 5D3",
         "type": "Proposal",
         "createdBy": sampleUser[1],
         "attendees": [sampleUser[1], sampleUser[2]],
         "invitees": [sampleUser[0], sampleUser[1], sampleUser[2]],
         "tasks": [tasks[0], tasks[1]]
},
{
    "name": "Moncton FundRaising",
    "description": "An event to raise funds for the food bank in the community",
    "startDate": "August 5, 2023",
    "endDate": "August 6, 2023",
    "isPrivate": "false",
    "location": "Coliseum, 377 Killam Dr, Moncton, NB E1C 3T1",
     "type": "Business",
     "createdBy": sampleUser[2],
         "attendees": [sampleUser[2], sampleUser[3], sampleUser[4]],
         "invitees": [sampleUser[0], sampleUser[1], sampleUser[2], sampleUser[3], sampleUser[4], sampleUser[5]],
         "tasks": [tasks[0], tasks[1], tasks[2], tasks[3] ]
}
]);
const test = await Event.find().populate('createdBy').populate('attendees').populate('invitees');
console.log(test);
const tasks = await Task.insertMany([  
    {
    "title": "Music arrangement",
        "description": "Arrange for musicians and instruments to be used",
        "assignedTo": sampleUser[0],
        "deadline": "May 10, 2023",
        "status": "pending", 
        "event": events[0]
},

{
    "title": "Food logistics",
    "description": "Contact every attendee to know what kind of food each person will be coming with",
    "assignedTo": sampleUser[1],
    "deadline": "May 8, 2023",
    "status": "pending",
    "event": events[1]
},


{
    "title": "Transportation",
    "description": "Plan how we would move tothe destination as a group",
    "assignedTo": sampleUser[2],
    "deadline": "May 8, 2023",
    "status": "completed",
    "event": events[2]
},

{
    "title": "MC",
        "description": "Get an MC for the event",
        "assignedTo": sampleUser[3],
        "deadline": "May 8, 2023",
        "status": "completed",
        "event": events[3]
},
]);


console.log('all done');
// console.log('Seeded database with events:', events);
process.exit(0);
    }catch (err) {
        throw err;
    }
}
)