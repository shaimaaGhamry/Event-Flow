import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_EVENTS, All_Users } from '../utils/queries';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import bulmaCalendar from "bulma-calendar";
import { CREATE_TASK } from '../utils/mutations';
// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]');
// Loop on each calendar initialized
calendars.forEach(calendar => {
    // Add listener to select event
    calendar.on('select', date => {
        console.log(date);
    });
});
// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
    element.bulmaCalendar.on('select', datepicker => {
        console.log(datepicker.data.value());
    });
}
const CreateTask = () => {
    const { data: data1 } = useQuery(ALL_EVENTS)
    console.log(data1);
    const events = data1?.events || [];
    const { data: data2 } = useQuery(All_Users)
    const users = data2?.users || [];
    return (
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Event</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="select is-normal is-primary">
                            <select>
                                <option>Select your Event</option>
                                <OwnedEvents events= {events} />
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field-body">
                    <div class="field">
                        <div class="select is-normal is-primary">
                            <select>
                                <option>Assign to a User</option>
                                <EventUsers users= {users} />
                            </select>
                        </div>
                    </div>
                </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Description</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input is-primary" type="text" placeholder="description"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Title</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input is-primary" type="text" placeholder="input task"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-horizontal">
                <div class="calendar">
                    <label for="date" className='event-date'>Deadline</label>
                    <input type="date" data-display-mode="inline" data-is-range="true" data-close-on-select="false"></input>
                </div>
            </div>
            <div class="field is-horizontal is-justify-content-center is-align-items-center">
                <div class="field-label">
                     </div>
                    <div class="field-body">
                       <div class="field">
                          <div class="control">
                            <button class="button is-primary">
                                Create Task
                            </button>
                          </div>
                       </div>
                       <div class="field">
                          <div class="control">
                            <button class="button is-primary">
                                Cancel
                            </button>
                          </div>
                       </div>
                   </div>
                </div>
            </div>
    )
}
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
            {(event.createdBy.id == userID)
            ? <option id={event._id}>{event.name}</option>
            :""}
           </>
          ))}
      </>
    )
  }
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
              {(user.id == userID)
              ? ""
              :<option id={user.id}>{user.userName}</option>}
             </>
            ))}
        </>
      )
    }
export default CreateTask;