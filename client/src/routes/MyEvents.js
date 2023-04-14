import React from 'react';

const MyEvents = () => {
  const pendingInvites = [
    { title: "ABC", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", id:"1" },
    { title: "DEF", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", id:"2" },
    { title: "GHI", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", id:"3" },
    { title: "JKL", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", id:"4" },
  ];
  const attendingEvents = [
    { title: "MNO", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id:"5" },
    { title: "PQR", type: "Graduation", owner: "Beatrix Lestrange", sdate: "20 Apr 2023", edate: "20 Apr 2023", scope: "private", id:"6" },
    { title: "STU", type: "Trip", owner: "Colin Creevey", sdate: "28 Apr 2023", edate: "5 May 2023", scope: "private", id:"7" },
    { title: "VWX", type: "Birthday", owner: "Draco Malfoy", sdate: "5 May 2023", edate: "5 May 2023", scope: "public", id:"8" },
  ];
  const expiredEvents = [
    { title: "YZ", type: "Baby Shower", owner: "Albus Dumbeldore", sdate: "15 Apr 2023", edate: "15 Apr 2023", scope: "public", id:"9" },
  ];
  return (
    <div className="main events-main">
      <div class="events">
        <div class="row event-row pending">
          <div class="event-list"><p><span class="event-list">PENDING INVITES</span></p></div>
          {pendingInvites.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} id={app.id} scope="private" />)}
        </div>
        <div class="row event-row attending">
          <div class="event-list"><p><span class="event-list">ATTENDING EVENTS</span></p></div>
          {attendingEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} scope={app.scope} />)}
          {expiredEvents.map((app) => <App type={app.type} title={app.title} owner={app.owner} sdate={app.sdate} edate={app.edate} scope="expired" />)}
        </div>
      </div>
      <div class="actions">
          <a class="div-button" href="createeventlink">
        <div class="create-button">
            <p>Create</p>
            <p>New Event</p>
        </div>
        </a>
      </div>
    </div>
  );
}

function App(props) {
  return (
    <div class="card">
      <a href={`./events/${props.id}`}>
      <div class={props.scope}>
        <div class="card-content">
          <div class="media">
            {/*       === For event type image ===   
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="img-link" alt="Placeholder image"></img>
            </figure>
          </div> */}
            <div class="media-content">
              <p class="title is-4">{props.title}</p>
              <p class="subtitle is-6">({props.type})</p>
              <p class="subtitle is-6">Event Owner: <b>{props.owner}</b></p>
              <p class="subtitle is-6"> Starts on <b>{props.sdate}</b> and ends on <b>{props.edate}</b></p>
            </div>
          </div>
        </div>
      </div>
      </a>
    </div>
  )
}

export default MyEvents;