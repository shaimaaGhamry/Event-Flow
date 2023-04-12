const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    userName: String
      email: String
    password: String
    pendingEvents: String
    acceptedEvents: String
    tasks: [Task]
    
  }

  type Task {
    _id: ID
    title: String
    description: String
    assignedTo: String
    deadline: String
    completed: String
    event: Event

  }

  type Event {
    _id: ID
    name: String
    description: String
    startDate: String
    endDate: String
    type: String
    isPrivate: Boolean
    location: String
    createdBy: User
    attendees: [User]
    invitees: [User]
    tasks: [Task]

  }

  type Query {
    users: [User]
    events: [Event]
    tasks: [Task]
  }
`;

module.exports = typeDefs;