import React from 'react';
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const taskList = [
    { title: "Buy ice", description: "Baby Shower", event: "ABC", owner: "Albus Dumbeldore", date: "15 Apr 2023", completed: false, id: 1 },
    { title: "Book tickets", description: "Trip", event: "DEF", owner: "Beatrix Lestrange", date: "20 Apr 2023", completed: false, id: 2 },
    { title: "Book accomodation", description: "Trip", event: "DEF", owner: "Beatrix Lestrange", date: "28 Apr 2023", completed: false, id: 3 },
    { title: "Collect cake", description: "Birthday", event: "GHI", owner: "Colin Creevey", date: "5 May 2023", completed: false, id: 4 },
  ];
  const completedTasks = [
    { title: "Order cake", description: "Birthday", event: "GHI", owner: "Colin Creevey", date: "15 Apr 2023", completed: true, id: 1 },
    { title: "Make reservation", description: "Birthday", event: "JKL", owner: "Draco Malfoy", date: "20 Apr 2023", completed: true, id: 2 },
  ];
  return (
    <div className="main events-main">
      <div className="events">
        <div className="row">
          {taskList.map((app) => <App description={app.description} event={app.event} title={app.title} owner={app.owner} date={app.date} completed={app.completed} id={app.id} />)}
          {completedTasks.map((app) => <App description={app.description} event={app.event} title={app.title} owner={app.owner} date={app.date} completed={app.completed} id={app.id} />)}
        </div>
      </div>
      <div className="right-panel actions">
        <Link to='/CreateTask' className="div-button">
          <div className="create-button">
            <p>Create</p>
            <p>New Task</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function App(props) {
  return (
    <div className="card">
      <a>
        <div className={props.completed ? "true" : "false"}>
          <div className="card-content">
            <div className="media">
              {/*       === For event type image ===   
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="img-link" alt="Placeholder image"></img>
            </figure>
          </div> */}
              <div className="media-content">
                <details>
                  <summary>
                    <p className="title is-4">{props.title}</p>
                    <p className="subtitle is-6"> To be completed by <b>{props.date}</b></p>
                  </summary>
                  <p className="subtitle is-6">for <b>{props.event}</b></p>
                  <p className="subtitle is-6">Details: ({props.description})</p>
                  <p className="subtitle is-6">Assigned by <b>{props.owner}</b></p>
                </details>
              </div>
              {!props.completed &&
                <div className="buttons">
                  <a className={"button is-primary " + props.id}>
                    <strong>Mark as Completed</strong>
                  </a>
                </div>
              }
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default MyTasks;