import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_EVENTS, All_Users } from "../utils/queries";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import bulmaCalendar from "bulma-calendar";
import { CREATE_TASK } from "../utils/mutations";
import { useNavigate } from 'react-router-dom'



// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]');

// Loop on each calendar initialized
calendars.forEach((calendar) => {
  // Add listener to select event
  calendar.on("select", (date) => {
    console.log(date);
  });
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector("#my-element");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", (datepicker) => {
    console.log(datepicker.data.value());
  });
}

const AddTask = () => {
  const { data: data1 } = useQuery(ALL_EVENTS);
  //   console.log(data1);
  const events = data1?.events || [];

  const { data: data2 } = useQuery(All_Users);
  //   console.log(data2);
  const users = data2?.users || [];

  const OwnedEvents = ({ events }) => {
    const userID = Auth.getProfile().data._id;

    if (!events.length) {
      return <p>No events available</p>;
    }

    return (
      <>
        {events &&
          events.map((event) => (
            <>
              {event.createdBy.id === userID ? (
                <option id={event._id} value={event._id}>{event.name}</option>
              ) : (
                ""
              )}
            </>
          ))}
      </>
    );
  };

  const EventUsers = ({ users }) => {
    const userID = Auth.getProfile().data._id;

    if (!users.length) {
      return <p>No users available</p>;
    }

    return (
      <>
        {users &&
          users.map((user) => (
            <>
              {user.id === userID ? (
                ""
              ) : (
                <option id={user.id} value={user.id}>{user.userName}</option>
              )}
            </>
          ))}
      </>
    );
  };

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    event: "",
  });

  const [createTask, { error }] = useMutation(CREATE_TASK);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate()


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const data = await createTask({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
    navigate('/myTasks')
  };

  return (
    <div class="hero is-fullheight">
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="create columns is-flex is-flex-direction-column box">
          <h1>Create a Task</h1>
          {data1 && (
            <form onSubmit={handleFormSubmit}>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Event</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="select is-normal is-primary">
                      <select
                        name="event"
                        className="form-select"
                        value={formState.event}
                        onChange={handleSelectChange}
                      >
                        <option value="">
                          Select your Event
                        </option>
                        <OwnedEvents events={events} />
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Assigned To</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="select is-normal is-primary">
                      <select
                        name="assignedTo"
                        className="form-select"
                        value={formState.assignedTo}
                        onChange={handleSelectChange}
                      >
                        <option value="">Assign to a User</option>
                        <EventUsers users={users} />
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Title</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        type="text"
                        placeholder="input task"
                        name="title"
                        value={formState.title}
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Description</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        type="text"
                        name="description"
                        value={formState.description}
                        placeholder="description"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="deadline calendar">
                  <label for="date" className="event-date">
                    Deadline
                  </label>
                  <input
                    type="date"
                    class="cal"
                    data-display-mode="inline"
                    data-is-range="true"
                    data-close-on-select="false"
                    name="deadline"
                    value={formState.deadline}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="field is-horizontal is-justify-content-center is-align-items-center">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary" type="submit">Create Task</button>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )

          }
          {error && (
            <div className="my-3 p-3 is-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
