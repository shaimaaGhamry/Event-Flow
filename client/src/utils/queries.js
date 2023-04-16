import { gql } from '@apollo/client';

export const All_Users = gql`
query Users {
    users {
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
        createdBy {
          id
          userName
          email
          password
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

export const EVENT_BY_ID = gql`
  query event($eventId: ID!) {
    event(id: $eventId) {
      _id
      name
      description
      startDate
      endDate
      type
      isPrivate
      location
      invitees {
        userName
        id
      }
      createdBy {
        userName
        id
      }
      attendees {
        userName
        id
      }
    }
  }
`;