import React from "react";
import {useSelector} from "react-redux";
import {selectRoomByMeetingId, selectTimeSlotForMeeting} from "../selectors/selectTimeBlockMeetings.js";

const Meeting = ({meeting}) => {
    const timeSlot = useSelector((state) => selectTimeSlotForMeeting(state, meeting.id));
    const location = useSelector((state) => selectRoomByMeetingId(state, meeting.id));
    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", JSON.stringify({meetingId: meeting.id}));
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <div
            draggable
            key={meeting.id} style={styles.card}
            onDragStart={handleDragStart}
        >
            <div>
                <strong>Name:</strong> {meeting.name}
            </div>
            <div>
                <strong>Description:</strong> {meeting.description}
            </div>
            <div>
                <strong>Duration:</strong> {meeting.duration}
            </div>
            {timeSlot && (
                <div>
                    <strong>Time:</strong> {`${timeSlot.time} ${timeSlot.day}`}
                </div>
            )}
            {location && (
                <div>
                    <strong>Room:</strong> {`${location.name} ${location.zone}`}
                </div>
            )}
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        padding: "0.75rem",
        marginBottom: "0.75rem",
        background: "#fafafa"
    }

};

export default Meeting;
