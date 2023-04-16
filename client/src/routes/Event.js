import React from 'react';
import { Link } from 'react-router-dom';

const Event = () => {

  const isPublic = false;

  return (
    <div className="main events-main">
      <div className="events">
        <div className="title is-4">Event Name by Event Owner</div>
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