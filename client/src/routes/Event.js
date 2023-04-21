import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EVENT_BY_ID } from '../utils/queries';
import auth from '../utils/auth';
import { ACCEPTE_EVENT, DECLINE_EVENT } from '../utils/mutations';

const Event = () => {
  const loggedIn = auth.getProfile().data._id;
  console.log(loggedIn);
const [acceptPendingEvent, {error}] = useMutation(ACCEPTE_EVENT);
const [declineEvent, {error2}] = useMutation(DECLINE_EVENT);


  const { eventId } = useParams();
  const { loading, data } = useQuery(EVENT_BY_ID, {
    variables: { eventId: eventId },
  });
  const event = data?.event || {};
console.log(event._id);
  if (loading) {
    return <div>Loading...</div>;
  }
  const attendeesList = event.attendees.map((attendee) => {return attendee.id});
console.log(attendeesList);
  async function handleAccept() {
    console.log("Handle Accept");

    try {
      const data = await acceptPendingEvent({
        variables:{
          eventId:eventId
        }
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDecline() {
    console.log("Handle Decline");
    try {
      const data = await declineEvent({
        variables:{
          eventId:eventId
        }
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
              {event.isPrivate
                ? ""
                :
                <Link to="">
                  <a className="button is-primary">Join</a>
                </Link>
              }
              {event.createdBy.id === loggedIn
                ?
                <Link to="">
                  <a className="button is-primary">Edit</a>
                </Link>
                :
                ""
              }
              {
                attendeesList.includes(loggedIn)
                  ?
                  <Link to="/myevents">
                    <button className="button is-primary" onClick={() => handleDecline()}>Decline </button>
                  </Link>
                  :
                  <Link to="/myevents">
                    <button className="button is-primary" onClick={() => handleAccept()}>Accept </button>
                  </Link>
              }



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
    <div>
      <ol>


        {tasks.map((task) => (
          <li>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.deadline}</div>
            <div>{task.status}</div>
          </li>
        ))}
      </ol>

    </div>
  )
}

export default Event;