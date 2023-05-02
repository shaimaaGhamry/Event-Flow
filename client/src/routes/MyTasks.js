import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import {  EVENT_BY_ID, MY_TASKS } from '../utils/queries';

const MyTasks = () => {
  const {data:myTasksData, loading} = useQuery(MY_TASKS);

if(loading){
  return(<div>Loading</div>)
}
const mytasks = myTasksData?.me.tasks || [];
 
console.log(mytasks);

  if(!auth.loggedIn()){ 
    return (<div>You have to log in first</div>);
  }

   
  return (
    <div className="main events-main">
      <div className="events">
        <div className="row">
          {mytasks && mytasks.map((app) => <App description={app.description}  event={app.event._id} title={app.title}  date={app.deadline} status={app.status} id={app.id} />)}
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
  const { loading, data } = useQuery(EVENT_BY_ID, {
    variables: { eventId: props.event },
  });

  const event = data?.event || {};
  console.log("After EVENT BY ID");
  console.log(event);
  return (
    <div className="card">
      <a>
        <div className={props.status}>
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
                  <p className="subtitle is-6">for Event : <b>{event.name}</b></p>
                  <p className="subtitle is-6">Description: ({props.description})</p>
                 
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