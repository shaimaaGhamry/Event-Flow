import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';

const MyEvents = () => {
  const pendingInvites = [
    { title: "Ladies hangout", type: "Trip", owner: "Bruce Wayne", sdate: "Apr 30, 2023", edate: "May 02, 2023", id: "64418d4cddcaa0020ccefb9b" },
    { title: "Movie night", type: "Proposal", owner: "Maxwell Slander", sdate: "May 04, 2023", edate: "May 04, 2023", id: "64418d4cddcaa0020ccefb9c" },
  ];
  const attendingEvents = [
    { title: "Movie night", type: "Proposal", owner: "Lucky Syatt", sdate: "May 06, 2023", edate: "May 06, 2023", scope: "private", id: "64418d4cddcaa0020ccefb9d" },
    { title: "Moncton FundRaising", type: "Business", owner: "Kent Clark", sdate: "Aug 05, 2023", edate: "Aug 06 2023", scope: "public", id: "64418d4cddcaa0020ccefb9e" },
  ];
  const expiredEvents = [
    { title: "Sample Expired Event", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "Apr 15, 2023", edate: "Apr 15, 2023", scope: "public", id: "9" },
  ];
  return (
    <div className="main events-main">
      <div className="events">
        <div className="row event-row pending">
          <div className="event-list"><p><span className="event-list">PENDING INVITES</span></p></div>
          {pendingInvites.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} id={app.id} scope="private" />)}
        </div>
        <div className="row event-row attending">
          <div className="event-list"><p><span className="event-list">ATTENDING EVENTS</span></p></div>
          {attendingEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} id={app.id} scope={app.scope} />)}
          {expiredEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} scope="expired" />)}
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

function App(props) {
  return (
    <div className="card">
      <Link to={`../event/${props.id}`}>
        <div className={props.scope}>
          <div className="card-content">
            <div className="media">
              {/*       === For event type image ===   
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="img-link" alt="Placeholder image"></img>
            </figure>
          </div> */}
              <div className="media-content">
                <p className="title is-4">{props.title}</p>
                <p className="subtitle is-6">({props.type})</p>
                <p className="subtitle is-6">Event Owner: <b>{props.owner}</b></p>
                <p className="subtitle is-6"> Starts on <b>{props.sdate}</b> and ends on <b>{props.edate}</b></p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MyEvents;