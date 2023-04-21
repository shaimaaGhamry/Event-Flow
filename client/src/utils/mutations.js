import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        userName
      }
    }
  }
  `;
  

  export const ADD_USER = gql`
   mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        email
        id
        userName
      }
    }
  }
  `;

  export const CREATE_EVENT = gql`
  mutation createEvent($input: EventInput!) {
    createEvent(input: $input) {
      _id
      name
    }
  }
  `;
  export const ACCEPTE_EVENT = gql`
  mutation acceptPendingEvent($eventId: ID!) {
    acceptPendingEvent(eventId: $eventId) {
      id
      userName
      acceptedEvents {
        _id
        
      }
    }
  }
  `;
  export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $assignedTo: ID!, $deadline: String!, $event: ID!) {
    createTask(title: $title, description: $description, assignedTo: $assignedTo, deadline: $deadline, event: $event) {
      title
      description
      assignedTo {
        id
        userName
      }
      deadline
      event {
        _id
        name
        
      }
    }
  }
  `;

  export const  DECLINE_EVENT = gql`
  mutation DeclineEvent($eventId: ID!) {
    declineEvent(eventId: $eventId) {
      id
      userName
    }
  }
  `;
