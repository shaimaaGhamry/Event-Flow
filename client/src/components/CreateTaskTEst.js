import { useState } from "react";
import { useQuery } from "@apollo/client";
import { EVENT_BY_ID, MY_ALL_EVENTS } from "../utils/queries";

function AddTask() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { data: myEventsData } = useQuery(MY_ALL_EVENTS);
  const { data: inviteesData, loading: inviteesLoading } = useQuery(EVENT_BY_ID, {
    variables: { eventId: selectedEventId },
    skip: !selectedEventId
  });

  const handleEventChange = (event) => {
    setSelectedEventId(event.target.value);
    console.log(inviteesData);
  };

  return (
    <div>
      <select onChange={handleEventChange}>
        <option value="">Select an event</option>
        {myEventsData && myEventsData.me.ownedEvents.map((event) => (
          <option key={event._id} value={event._id}>{event.name}</option>
        ))}
      </select>

      {inviteesLoading && <p>Loading invitees...</p>}

      {inviteesData && (
        <select>
          <option value="">Select an invitee</option>
          {inviteesData.event.invitees.map((invitee) => (
            <option key={invitee.id} value={invitee.id}>{invitee.userName}</option>
          ))}
        </select>
      )}
    </div>
  );
}
export default AddTask;
