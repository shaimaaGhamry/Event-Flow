const db = require("../config/connection");
const { User, Event, Task } = require("../models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Event.deleteMany({});
    await Task.deleteMany({});
    const sampleUser = await User.create(userSeeds);

    const events = await Event.insertMany([
      {
        name: "Ladies hangout",
        description: "A time to relax and have fun at a beach resort",
        startDate: new Date("2023-05-01"),
        endDate: new Date("2023-05-03"),
        isPrivate: "true",
        location: "800 Gauvin Rd, Moncton NB E1A 1N1",
        type: "Trip",
        createdBy: sampleUser[0]._id,
        attendees: [sampleUser[0]._id, sampleUser[1]._id],
        invitees: [sampleUser[1]._id, sampleUser[2]._id],
        // "tasks": [tasks[0], tasks[1]]
      },
      {
        name: "Movie night",
        description: "A time to see a movie at a cinema",
        startDate: new Date("2023-05-05"),
        endDate: new Date("2023-05-06"),
        isPrivate: "true",
        location: "Cineplex, 800 Champlain Rd, Moncton NB E1A 5D3",
        type: "Proposal",
        createdBy: sampleUser[1]._id,
        attendees: [sampleUser[1]._id, sampleUser[2]._id],
        invitees: [sampleUser[0]._id, sampleUser[2]._id],
        //  "tasks": [tasks[0], tasks[1]]
      },
      {
        name: "Movie night",
        description: "A time to see a movie at a cinema",
        startDate: "May 5, 2023",
        endDate: "May 6, 2023",
        isPrivate: "true",
        location: "Cineplex, 800 Champlain Rd, Moncton NB E1A 5D3",
        type: "Proposal",
        createdBy: sampleUser[2]._id,
        attendees: [sampleUser[1]._id, sampleUser[2]._id],
        invitees: [sampleUser[0]._id, sampleUser[1]._id, sampleUser[3]._id],
        //  "tasks": [tasks[0], tasks[1]]
      },
      {
        name: "Moncton FundRaising",
        description:
          "An event to raise funds for the food bank in the community",
        startDate: "August 5, 2023",
        endDate: "August 6, 2023",
        isPrivate: "false",
        location: "Coliseum, 377 Killam Dr, Moncton, NB E1C 3T1",
        type: "Business",
        createdBy: sampleUser[3]._id,
        attendees: [sampleUser[2]._id, sampleUser[3]._id, sampleUser[1]._id],
        invitees: [
          sampleUser[0]._id,
          sampleUser[1]._id,
          sampleUser[2]._id,

          
        ],
        //  "tasks": [tasks[0], tasks[1], tasks[2], tasks[3] ]
      },
    ]);

    const tasks = await Task.insertMany([
      {
        title: "Music arrangement",
        description: "Arrange for musicians and instruments to be used",
        assignedTo: sampleUser[0]._id,
        deadline: "2023-05-10T13:00:00.000+00:00",
        status: "pending",
        event: events[0]._id,
      },

      {
        title: "Food logistics",
        description:
          "Contact every attendee to know what kind of food each person will be coming with",
        assignedTo: sampleUser[1]._id,
        deadline: "2023-05-08T13:00:00.000+00:00",
        status: "pending",
        event: events[1]._id,
      },

      {
        title: "Transportation",
        description: "Plan how we would move tothe destination as a group",
        assignedTo: sampleUser[2]._id,
        deadline: "2023-05-08T18:00:00.000+00:00",
        status: "completed",
        event: events[2]._id,
      },

      {
        title: "MC",
        description: "Get an MC for the event",
        assignedTo: sampleUser[3]._id,
        deadline: "2023-05-11T13:00:00.000+00:00",
        status: "completed",
        event: events[3]._id,
      },
    ]);

    const createdUsers = await User.find({});
    const createdTasks = await Task.find({});
    const createdEvents = await Event.find({});
// console.log(createdUsers);
// await createdUsers.save();
   
    createdUsers[0].tasks.push(createdTasks[0].id);
    await createdUsers[0].save();
    createdUsers[1].tasks.push(createdTasks[1].id);
    await createdUsers[1].save();
    createdUsers[2].tasks.push(createdTasks[2].id);
    await createdUsers[2].save();
    createdUsers[3].tasks.push(createdTasks[3].id);
    await createdUsers[3].save();

    createdEvents[0].tasks.push(createdTasks[0].id);
    await createdEvents[0].save();
    createdEvents[1].tasks.push(createdTasks[1].id);
    await createdEvents[1].save();
    createdEvents[2].tasks.push(createdTasks[2].id);
    await createdEvents[2].save();
    createdEvents[3].tasks.push(createdTasks[3].id);
    await createdEvents[3].save();
    console.log(createdUsers);
    console.log(createdUsers);
    // const test = await Event.find()
    //   .populate("createdBy")
    //   .populate("attendees")
    //   .populate("invitees")
    //   .populate("tasks");
    // console.log(test);

    console.log("all done");
    // console.log('Seeded database with events:', events);
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
