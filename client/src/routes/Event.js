import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID } from '../utils/queries';

const Event = () => {

  const { eventId } = useParams();
  const { loading, data } = useQuery(EVENT_BY_ID, {
    variables: { eventId: eventId },
  });
  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main events-main">
      <div className="events">
        <article className={event.isPrivate ? "message private-body" : "message public-body"}>
          <div className={event.isPrivate ? "message-header private title is-5" : "message-header public title is-5"}>
            <p>{event.name} by {event.createdBy.userName}</p>
          </div>
          <div className="message-body">
            <p>Type: <b>{event.type}</b></p>
            <p>Starts on <b>{event.startDate}</b> and ends on <b>{event.endDate}</b></p>
            <p>Location: <b>{event.location}</b></p>
            <p>Created by: <b>{event.createdBy.userName}</b></p>
            <p>This is a <b>{event.isPrivate ? "private" : "public"}</b> event</p>
            <p>Details:</p>
            <p className="details">{event.description}</p>
          </div>
          <footer class="card-footer">
            <div className="buttons">
              {event.isPrivate ? "" :
                <Link to="">
                  <a className="button is-primary">Join</a>
                </Link>}
              <Link to="">
                <a className="button is-primary">Edit</a>
              </Link>
              <Link to="">
                <a className="button is-primary">Accept Invite</a>
              </Link>
              <Link to="">
                <a className="button is-primary">Decline Invite</a>
              </Link>
            </div>
          </footer>
        </article>
      </div>
      <div className="right-panel lists">
        {event.isPrivate &&
          <>
            <div className="row event-row invitees">
              <div className="event-list"><p><span className="event-list">INVITED</span></p></div>
              <EventInvitees invitees={event.invitees} attendees={event.attendees} />
            </div>
            <div className="row event-row event-tasks">
              <div className="event-list"><p><span className="event-list">TASKS</span></p></div>
              <EventTasks tasks={event.tasks} />
            </div>
          </>
        }
      </div>
    </div>
  );
}

const EventInvitees = ({ invitees, attendees }) => {
  if (!invitees.length) {
    return <p>No one's been invited yet</p>;
  }
  let inviteeNames = invitees.map(iName => iName.userName);
  let attendeeNames = attendees.map(aName => aName.userName);
  let confirmationPending = inviteeNames.filter(
    invitee => !attendeeNames.includes(invitee)
  );
  console.log(confirmationPending);
  return (
    <>
      {attendeeNames.map((attendee) => (
        <div>
          <p className="invitees">{attendee} <span className="checkmark">&#x2713;</span></p>
        </div>
      ))}
      {confirmationPending.map((invitee) => (
        <div>
          <p className="invitees">{invitee} </p>
        </div>
      ))}
    </>
  )
}

const EventTasks = ({ tasks }) => {
  return (
    <p>task list here</p>
  )
}

export default Event;