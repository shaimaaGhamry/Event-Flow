import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_EVENTS } from '../utils/queries';
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, data } = useQuery(ALL_EVENTS);
  const events = data?.events || [];
  return (
    <div className="main events-main">
      <div className="events">
        <div className="title is-4">Events that you might be interested in:</div>
        <div className="row">
          <PublicEvents events={events} />
        </div>
      </div>
      <div className="right-panel actions">
        <Link to="/CreateEvent" className="div-button">
          <div className="create-button">
            <p>Create</p>
            <p>New Event</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

const PublicEvents = ({ events }) => {
  if (!events.length) {
    return <p>No public events available</p>;
  }

  return (
    <>
      {events &&
        events.map((event) => (
          <div className={event.isPrivate ? "card hidden" : "card"}>
            {event.isPrivate ? "" :
              <Link to={`../event/${event._id}`}>
                <div className={event.isPrivate ? "private" : "public"}>
                  <div className="card-content">
                    <div className="media">
                      {/*       === For event type image ===   
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img src="img-link" alt="Placeholder image"></img>
                        </figure>
                      </div> */}
                      <div className="media-content">
                        <p className="title is-4">{event.name}</p>
                        <p className="subtitle is-6">({event.type})</p>
                        <p className="subtitle is-6">Event Owner: <b>{event.createdBy.userName}</b></p>
                        <p className="subtitle is-6"> Starts on <b>{event.startDate}</b> and ends on <b>{event.endDate}</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            }
          </div>
        ))}
    </>
  )
}

export default Home;