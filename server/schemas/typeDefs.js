const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  
  

  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    profile: User
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
  completed: Boolean!
  event: Event
}

type User {
  id: ID!
  userName: String!
  email: String!
  password: String!
  pendingEvents: [Event]!
  acceptedEvents: [Event]!
  tasks: [Task]!
}

type Query {
  event(id: ID!): Event
  events: [Event!]!
  
  task(id: ID!): Task
  tasks: [Task]!
  
  users: [User]!
  user(userId: ID!): User
    
}


type Mutation {
  createEvent(title: String!, description: String!, startDate: String!, endDate: String!, location: String!): Event!
  createEvent2(input: EventInput!): Event!
 
  updateEvent(id: ID!, title: String, description: String, startDate: String, endDate: String, location: String): Event!
  
  updateEvent2(id: ID!, input: EventInput!): Event!
  deleteEvent(id: ID!): Event!

  createTask(title: String!, description: String!, assignedTo: ID!, deadline: String!, eventId: ID): Task!
  updateTask(id: ID!, title: String, description: String, assignedTo: ID, deadline: String, completed: Boolean, eventId: ID): Task!
  deleteTask(id: ID!): Boolean!
  
  addUser(userName: String!, email: String!, password: String!): User
  login(email: String!, password: String!): Auth

  updateUser(id: ID!, userName: String, email: String, password: String): User!
  deleteUser(id: ID!): Boolean!
 
}
`;


module.exports = typeDefs;
