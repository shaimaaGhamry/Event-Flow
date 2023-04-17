import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID } from '../utils/queries';

const Event = () => {
  
  const isPublic = false;

  const { eventId } = useParams();
  const { loading, data } = useQuery(EVENT_BY_ID, {
    variables: { eventId: eventId },
  });
  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main events-main">
      <div className="events">
        <div className="title is-4">{event.name} by {event.createdBy.userName}</div>
        <div className="row">
          <p>Type: {event.type}</p>
          <p>Starting on {event.startDate} and ending on {event.endDate}</p>
          <p>Location:{event.location}</p>
          <p>Details:</p>
          <p>{event.description}</p>
        </div>
      </div>
      <div className="actions">
        {isPublic
          ? ""
          : <div>
            <div className="attendees">
              Attendees
            </div>
            <div className="attendees">
              Tasks
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Event;