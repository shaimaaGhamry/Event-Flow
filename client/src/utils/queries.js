import { gql } from '@apollo/client';

export const ALL_USERS_ID = gql`
query users {
  users {
    id
    userName
  }
}
`;
export const MY_TASKS = gql`
query Query {
  me {
    tasks {
      id
      title
      description
      
      status
      deadline
      event {
        _id
        
      }
    }
  }
}
`;
export const MY_ALL_EVENTS = gql`
query MyALLEvents {
  me {
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
    ownedEvents {
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
}`;

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
        password
        email
      }
      attendees {
        id
        email
        userName
        password
      }
      invitees {
        id
        userName
        email
        password
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
          status
          event {
            _id
            description
            name
            endDate
            startDate
            type
            isPrivate
            location
          }
        }
      }
    }
  }
}
  `;

export const LOGGED_IN_USER = gql`
query LoggedinUser($userId: ID!) {
  user(userId: $userId) {
    _id
    userName
  }
}`;

export const ALL_EVENTS = gql`
query Events {
  events {
    _id
    name
    description
    type
    location
    startDate
    endDate
    isPrivate
    createdBy {
      id
      userName
    }
    invitees {
      id
      userName
    }
    attendees {
      id
      userName
    }
    tasks {
      id
      title
      description
      deadline
      
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
    
    tasks{
      title
      description
      status
      deadline
      
    }

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