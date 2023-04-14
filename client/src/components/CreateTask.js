import React from 'react';

const CreateTask = () => {
    return (
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Created By</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input is-primary" type="text" placeholder="task owner"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Assigned To</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input is-primary" type="text" placeholder="assignee"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Event Title</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input is-primary" type="text" placeholder="event title"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Task</label>
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
                    <label for="date" className='event-date'>Event Date</label>
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

export default CreateTask;