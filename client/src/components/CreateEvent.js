import React, { useState, useEffect } from 'react';
import Datetimepicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { useMutation, useQuery } from '@apollo/client';
import { ALL_USERS_ID, } from '../utils/queries';
import auth from '../utils/auth';

import { CREATE_EVENT } from '../utils/mutations';
import {Navigate} from "react-router-dom";

function CreateEvent() {
    const loggedIn = auth.getProfile().data._id;

    const [value, setValue] = useState(new Date());

    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(ALL_USERS_ID);

    const [createEvent, { eventError, data }] = useMutation(CREATE_EVENT, {
        onCompleted: () => {
          // Once the mutation is completed, set redirect to true
          <Navigate to="/myevents"></Navigate>
        },});


    const users = usersData?.users || {};


    if (usersLoading)
        return <p>Loading...</p>;
    if (eventError)
        return <p>Error creating events</p>;
    if (usersError)
        return <p>Error loading users</p>;

if (data) return <Navigate to="/myevents"/>

    function addSelectedUsert(event) {
        const optionElem = document.getElementById(event.target.id);
        const parentElementId = optionElem.parentElement.id;
        if (parentElementId === "names-list") {
            let selectedNamesList = document.getElementById("selected-names-list");
            selectedNamesList.appendChild(event.target);
        } else {
            let namesList = document.getElementById("names-list");
            namesList.appendChild(event.target);
        }

    }

    async function handleSubmitForm(event) {

        event.preventDefault();
        console.log("The form has been submitted");
        const selectedinvitees = Array.from(event.target.invitees.selectedOptions).map(option => option.value);


        const formData = {
            name: event.target.name.value,
            description: event.target.description.value,
            type: event.target.type.value,
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
            isPrivate: (event.target.isPrivate.value == 'on') ? true : false,
            invitees: selectedinvitees,
            location: '',
            createdBy: loggedIn,
            attendees: [],
            tasks: []
        };
        console.log(formData);
        try {
            const { data } = await createEvent({
                variables: {
                    "input": {
                        ...formData
                    }
                }
            });
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='container m-5'>
            <div className='box'>
                <h1 className='is-size-1'>Create an Event</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className="field">
                        <label className="label" htmlFor='name'>Title</label>
                        <div className="control">
                            <input name='name' className="input is-primary" type="text" placeholder="Event Title" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="description">Description</label>
                        <div className="control">
                            <textarea name='description' className="textarea is-primary" placeholder="Describe your event"></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Event Type</label>
                        <div className="control">
                            <div className="select is-primary">
                                <select name='type'>
                                    <option>Select an option</option>
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
                    </div>
                    <div className='field is-horizontal '>
                        <div className='field m-2'>
                            <label htmlFor="datetime" className='label start-datetime'>Start Date&Time</label>
                            <div className='control'>
                                <Datetimepicker name='startDate' onChange={setValue} value={value} data-display-mode="inline" />
                            </div>
                        </div>

                        <div className='field m-2'>
                            <label htmlFor="datetime" className=' label end-datetime'>End Date&Time</label>
                            <div className='control'>
                                <Datetimepicker name='endDate' onChange={setValue} value={value} data-display-mode="inline" />
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className="checkbox">
                            <input type="checkbox" name="isPrivate" />
                            <span style={{ marginLeft: '10px' }}>Private Event</span>
                        </label>
                    </div>
                    <div className='field is-horizontal ma'>
                        <div className='field m-3'>
                            <label className="label">All Users</label>
                            <div className="control">
                                <div className="select is-multiple">
                                    <select id="names-list" multiple>
                                        {users.map((user) => {
                                            return (<option id={user.id} value={user.id} onDoubleClick={(event) => addSelectedUsert(event)}>{user.userName}</option>);
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='field m-3'>
                            <label className="label">Invited Users</label>
                            <div className="control">
                                <div className="select is-multiple">
                                    <select name="invitees" id="selected-names-list" multiple></select>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='field'>
                        <div className="control">
                            {/* <Link to="/myevents"> */}
                            <button className="button is-primary is-fullwidth is-half" type="submit">Create Event</button>
                            {/* </Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;