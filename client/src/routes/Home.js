import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const publicEvents = [
    { title: "ABC", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", id: "1" },
    { title: "DEF", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", id: "2" },
    { title: "GHI", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", id: "3" },
    { title: "JKL", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", id: "4" },
  ];
  return (
    <div className="main events-main">
      <div className="events">
      <div className="title is-4">Events that you might be interested in:</div>
        <div className="row">
          {publicEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} id={app.id} scope="public" />)}
        </div>
      </div>
      <div className="actions">
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
      <Link to={`./event/${props.id}`}>
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

export default Home;