import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { MY_ALL_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const MyEvents = () => {

  
  const { loading, data } = useQuery(MY_ALL_EVENTS);
  console.log(data);
  const my_pending_events = data?.me.pendingEvents || [];
  const my_owned_events = data?.me.ownedEvents || [];
  const my_accepted_events = data?.me.acceptedEvents || [];
  
  console.log(my_pending_events);
  console.log(my_accepted_events);
  console.log(my_owned_events);

  // const my_pending_events = [
  //   { title: "ABC", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", id: "643f196afc50ec07503633d5" },
  //   { title: "DEF", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", id: "643f196afc50ec07503633d6" },
  //   { title: "GHI", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", id: "643f196afc50ec07503633d7" },
  //   { title: "JKL", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", id: "643efa80a58ebacd7a84fabf" },
  // ];
  // const my_accepted_events = [
  //   { title: "MNO", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id: "5" },
  //   { title: "PQR", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", scope: "private", id: "6" },
  //   { title: "STU", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", scope: "private", id: "7" },
  //   { title: "VWX", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", scope: "public", id: "8" },
  // ];

  const expiredEvents = [
    { title: "YZ", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id: "9" },
  ];
  if(!auth.loggedIn()){ 
    return (<div>You have to log in first</div>);
  }
  return (
    <div className="main events-main">
      <div className="events">
      <div className="row event-row pending">
          <div className="event-list"><p><span className="event-list">My owned Events</span></p></div>
          {my_owned_events.map((app) => <App type={app.type} title={app.name} owner={app.createdBy} sdate={app.startDate} edate={app.endDate} id={app._id} scope={app.isPrivate? "private" : "public"} />)}
        </div>
        
        <div className="row event-row pending">
          <div className="event-list"><p><span className="event-list">My Pending Events</span></p></div>
          {my_pending_events.map((app) => <App type={app.type} title={app.name} owner={app.createdBy} sdate={app.startDate} edate={app.endDate} id={app._id} scope={app.isPrivate? "private" : "public"} />)}
        </div>
        
        <div className="row event-row attending">
          <div className="event-list"><p><span className="event-list">ACCEPTED EVENTS</span></p></div>
          {my_accepted_events.map((app) => <App type={app.type} title={app.name} owner={app.createdBy} sdate={app.startDate} edate={app.endDate} id={app._id} scope={app.isPrivate? "private" : "public"} />)}
          {/* {expiredEvents.map((app) => <App type={app.type} title={app.title} owner={app.createdBy} sdate={app.sdate} edate={app.edate} scope="expired" />)} */}
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
                <p className="title is-4">{props.title}{props.id}</p>
                <p className="subtitle is-6">({props.type})</p>
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