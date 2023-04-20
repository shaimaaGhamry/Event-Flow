import React from 'react';
import { Link } from 'react-router-dom';

const MyEvents = () => {
  const pendingInvites = [
    { title: "ABC", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", id: "643f196afc50ec07503633d5" },
    { title: "DEF", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", id: "643f196afc50ec07503633d6" },
    { title: "GHI", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", id: "643f196afc50ec07503633d7" },
    { title: "JKL", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", id: "643efa80a58ebacd7a84fabf" },
  ];
  const attendingEvents = [
    { title: "MNO", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id: "5" },
    { title: "PQR", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", scope: "private", id: "6" },
    { title: "STU", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", scope: "private", id: "7" },
    { title: "VWX", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", scope: "public", id: "8" },
  ];
  const expiredEvents = [
    { title: "YZ", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id: "9" },
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
          {attendingEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} scope={app.scope} />)}
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