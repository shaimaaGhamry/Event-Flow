const { gql } = require("apollo-server-express");

const typeDefs = gql` 

  type Auth {
    token: ID!
    user: User
  }


  type Event {
    _id: ID!
    name: String!
    description: String
    startDate: String!
    endDate: String!
    type: String!
    isPrivate: Boolean
    location: String
    createdBy: User!
    attendees: [User]
    invitees: [User!]
    tasks: [Task]
  }
  
  input EventInput {
    name: String!
    description: String
    startDate: String!
    endDate: String!
    type: String!
    isPrivate: Boolean
    location: String
    createdBy: ID!
    attendees: [ID]
    invitees: [ID!]
    tasks: [ID]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    assignedTo: User!
    deadline: String
    status: String
    event: Event!
  }




  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    pendingEvents: [Event]!
    acceptedEvents: [Event]!
    ownedEvents: [Event]!

    tasks: [Task]!
  }

  
type Query {
  event(id: ID!): Event
  events: [Event]
  eventsAsc: [Event]
  eventsDesc: [Event]

  task(id: ID!): Task
  tasks: [Task]!
  
  users: [User]!
  user(userId: ID!): User
  me: User
    
}


  type Mutation {
    createEvent(input: EventInput!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    deleteEvent(id: ID!): Event

    acceptPendingEvent(eventId: ID!): User
    declineEvent(eventId: ID!): User


    createTask(
      title: String!
      description: String!
      assignedTo: ID!
      deadline: String!
      event: ID!
    ): Task!
    
    updateTask(
      id: ID!
      title: String
      description: String
      assignedTo: ID
      deadline: String
      event: ID
    ): Task!
    # deleteTask(id: ID!): Boolean!

    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
