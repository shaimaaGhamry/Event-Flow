import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_TASKS } from '../utils/queries';
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const { loading, data } = useQuery(ALL_TASKS);
  console.log(data);
  const tasks = data?.tasks || [];

  return (
    <div className="main events-main">
      <div className="events">
        <div className="row">
          <TaskList tasks={tasks} />
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

function TaskList({ tasks }) {

  if (!tasks.length) {
    return <p>No tasks have been assigned to you</p>;
  }

  return (
    <>
      {tasks && tasks.map((task) => (
        <div className="card">
          <a>
            <div className={task.status}>
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
                        <p className="title is-4">{task.title}</p>
                        <p className="subtitle is-6"> To be completed by <b>{task.deadline}</b></p>
                      </summary>
                      <p className="subtitle is-6">for <b>{task.event.name}</b></p>
                      <p className="subtitle is-6">Details: {task.description}</p>
                      <p className="subtitle is-6">Status: {task.status}</p>
                    </details>
                  </div>
                  {/* {(task.status = "pending") ? */}
                  <div className="buttons">
                    <a className={"button is-primary " + task.id}>
                      <strong>Mark as Completed</strong>
                    </a>
                  </div>
                  {/* :""
              } */}
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  )
}

export default MyTasks;