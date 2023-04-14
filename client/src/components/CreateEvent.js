import React from 'react';

import bulmaCalendar from "bulma-calendar";

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


const CreateEvent = () => {
    return (
        <div class="hero is-fullheight">
            <h1>Create an Event</h1>
            <div class="hero-body is-justify-content-center is-align-items-center">
                <div class="columns is-flex is-flex-direction-column box">
                    <div class="column">
                        <label for="email">Title</label>
                        <input class="input is-primary" type="text" placeholder="Event Title"></input>
                    </div>
                    <div class="column">
                        <label for="email">Owner</label>
                        <input class="input is-primary" type="text" placeholder="Event Owner"></input>
                    </div>
                    <div class="column">
                        <label for="description">Description</label>
                        <textarea class="textarea is-primary" placeholder="Describe your event"></textarea>
                    </div>
                    <div class="column">
                        <div class="select is-normal is-primary">
                            <select>
                                <option>Event Type</option>
                                <option>Anniversary</option>
                                <option>Baby Shower</option>
                                <option>Birthday</option>
                                <option>Business</option>
                                <option>Conference</option>
                                <option>Graduation</option>
                                <option>Proposal</option>
                                <option>Trip</option>
                                <option>Wedding</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="calendar">
                            <label for="date" className='start-date'>Start Date</label>
                            <input type="date" data-display-mode="inline" data-is-range="true" data-close-on-select="false"></input>
                        </div>
                        <div class="calendar">
                            <label for="date" className='end-date'>End Date</label>
                            <input type="date" data-display-mode="inline" data-is-range="true" data-close-on-select="false"></input>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="public"></input>
                                Public
                            </label>
                            <label class="radio">
                                <input type="radio" name="private"></input>
                                Private
                            </label>
                        </div>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-fullwidth" type="submit">Create Event <a href='/myevents'></a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent;