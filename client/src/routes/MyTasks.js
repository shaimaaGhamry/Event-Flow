import React from 'react';

const MyTasks = () => {
  const taskList = [
    { title: "Buy ice", description: "Baby Shower", event: "ABC", owner: "Albus Dumbeldore", date: "15 Apr 2023", completed:"false", id: "1" },
    { title: "Book tickets", description: "Trip", event: "DEF", owner: "Beatrix Lestrange", date: "20 Apr 2023", completed:"false", id: "2" },
    { title: "Book accomodation", description: "Trip", event: "DEF", owner: "Beatrix Lestrange", date: "28 Apr 2023", completed:"false", id: "3" },
    { title: "Collect cake", description: "Birthday", event: "GHI", owner: "Colin Creevey", date: "5 May 2023", completed:"false", id: "4" },
  ];
  const completedTasks = [
    { title: "Order cake", description: "Birthday", event: "GHI", owner: "Colin Creevey", date: "15 Apr 2023", completed:"true", id: "1" },
    { title: "Make reservation", description: "Birthday", event: "JKL", owner: "Draco Malfoy", date: "20 Apr 2023", completed:"true", id: "2" },
  ];
  return (
    <div className="main events-main">
      <div class="events">
        <div class="row">
          {taskList.map((app) => <App description={app.description} event={app.event} title={app.title} owner={app.owner} date={app.date} completed={app.completed} id={app.id} />)}
          {completedTasks.map((app) => <App description={app.description} event={app.event} title={app.title} owner={app.owner} date={app.date} completed={app.completed} id={app.id} />)}
        </div>
      </div>
      <div class="actions">
        <a class="div-button" href="createeventlink">
          <div class="create-button">
            <p>Create</p>
            <p>New Task</p>
          </div>
        </a>
      </div>
    </div>
  );
}

function App(props) {
  return (
    <div class="card">
      <a>
        <div class={props.completed}>
          <div class="card-content">
            <div class="media">
              {/*       === For event type image ===   
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="img-link" alt="Placeholder image"></img>
            </figure>
          </div> */}
              <div class="media-content">
                <details>
                  <summary>
                    <p class="title is-4">{props.title}</p>
                    <p class="subtitle is-6"> To be completed by <b>{props.date}</b></p>
                  </summary>
                    <p class="subtitle is-6">for <b>{props.event}</b></p>
                    <p class="subtitle is-6">Details: ({props.description})</p>
                    <p class="subtitle is-6">Assigned by <b>{props.owner}</b></p>
                </details>
              </div>
              <div class="buttons">
                <a class={"button is-primary "+props.id}>
                  <strong>Completed</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default MyTasks;