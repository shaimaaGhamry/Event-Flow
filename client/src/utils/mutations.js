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
      description
      startDate
      endDate
      type
      isPrivate
      location
      createdBy {
        id
        userName
        email
        password
        pendingEvents {
          _id
          name
          description
          startDate
          endDate
          type
          isPrivate
          location
        }
        acceptedEvents {
          _id
          name
          description
          startDate
          endDate
          type
          isPrivate
          location
        }
      }
      attendees {
        id
        userName
        email
        password
      }
      invitees {
        id
        userName
        email
        password
      }
      tasks {
        id
        title
        description
        assignedTo {
          id
          userName
          email
          password
        }
        deadline
        completed
        event {
          _id
          name
          description
          startDate
          endDate
          type
          isPrivate
          location
        }
      }
    }
  }
  `;