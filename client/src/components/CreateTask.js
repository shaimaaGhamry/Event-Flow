import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {  EVENT_BY_ID, MY_ALL_EVENTS } from "../utils/queries";
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


const [formState, setFormState] = useState({
  title: "",
  description: "",
  assignedTo: "",
  deadline: "",
  event: "",
});

const [createTask, { error }] = useMutation(CREATE_TASK);


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
  console.log("The form has been submitted");
  console.log(formState);

  try {
    const data = await createTask({
      variables: { ...formState },
    });

    console.log("After CReate Task");
    console.log(data);
  } catch (err) {

    console.error(err);
  }
 navigate('/myTasks')
};


const [selectedEventId, setSelectedEventId] = useState(null);
const { data: myEventsData } = useQuery(MY_ALL_EVENTS);
console.log(myEventsData);

const { data: attendeesData, loading: attendeesLoading } = useQuery(EVENT_BY_ID, {
  variables: { eventId: selectedEventId },
  skip: !selectedEventId
});
console.log(attendeesData);

const handleEventChange = (event) => {
  setSelectedEventId(event.target.value);
  handleInputChange(event);
};


return (

  <div className="hero-body is-justify-content-center is-align-items-center">
    {myEventsData && (
      <form onSubmit={handleFormSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Event</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="select is-normal is-primary">
                <select name="event"  className="form-select" onChange={handleEventChange}>
                  <option value="">Select an event</option>
                  {myEventsData && myEventsData.me.ownedEvents.map((event) => (
                    <option key={event._id} value={event._id}>{event.name}</option>
                  ))}
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
                {attendeesLoading && <p>Loading attendees...</p>}

                {attendeesData && (
                  <select 
                  name="assignedTo"
                  className="form-select"
                  onChange={handleInputChange}
                  >
                    <option value="">Select an invitee</option>
                    {attendeesData.event.invitees.map((invitee) => (
                      <option key={invitee.id} value={invitee.id}>{invitee.userName}</option>
                    ))}
                  </select>
                )}

                
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
          <div className="calendar">
            <label for="date" className="event-date">
              Deadline
            </label>
            <input
              type="date"
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
);
};

export default AddTask;
