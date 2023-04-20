import React, { useState }from 'react';

import Datetimepicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const CreateEvent = () => {
    const [value, setValue] = useState(new Date());

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
                    <div class="start-calendar is-primary">
                        <label for="datetime" className='start-datetime'>Start Date&Time </label>
                        <Datetimepicker onChange={setValue} value={value} data-display-mode="inline"></Datetimepicker>
                    </div>

                    <div className='end-calendar'>
                        <label for="datetime" className='end-datetime'>End Date&Time </label>
                        <Datetimepicker onChange={setValue} value={value} data-display-mode="inline"></Datetimepicker>
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