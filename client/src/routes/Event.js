import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID } from '../utils/queries';

const Event = () => {
  
  const isPublic = false;

  const { eventId } = useParams();
  console.log(eventId);
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
        <div className="title is-4">{event.name} by Username</div>
        <div className="row">
          Event details here
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