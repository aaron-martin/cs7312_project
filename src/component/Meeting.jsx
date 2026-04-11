import React, {useState} from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import {selectRoomByMeetingId, selectTimeSlotForMeeting} from "../selectors/selectTimeBlockMeetings.js";
import {FLOOR_PLAN_PANEL, PLANNER_PANEL} from "../reducer/activePanel.js";

const Meeting = ({meeting}) => {
    const navigate = useNavigate();
    const timeSlot = useSelector((state) => selectTimeSlotForMeeting(state, meeting.id));
    const location = useSelector((state) => selectRoomByMeetingId(state, meeting.id));
    const activeView = useSelector((state) => state.settings.activePanel);
    const [isHovered, setIsHovered] = useState(false);
    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
                meetingId: meeting.id,
                scheduleId: timeSlot?.scheduleId
            })
        );
        event.dataTransfer.effectAllowed = "move";
    };
    const isDraggable = !(activeView === PLANNER_PANEL && !!timeSlot || activeView === FLOOR_PLAN_PANEL && !!location)

    return (
        <div
            draggable={isDraggable}
            key={meeting.id}
            style={{
                ...styles.card,
                ...(isDraggable ? {cursor: "grab"} : {}),
                ...(isHovered && isDraggable ? styles.cardHover : {})
            }}
            onDragStart={handleDragStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
            <div>
                <strong>Expected Attendance:</strong> {meeting.numAttendees}
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
            <button
                type="button"
                onClick={() => navigate(`/meeting/edit/${meeting.id}`)}
                style={styles.button}
            >
                Edit
            </button>
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        padding: "0.75rem",
        marginBottom: "0.75rem",
        background: "#fafafa",
        transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
    },
    cardHover: {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
    },
    button: {
        marginTop: "0.75rem",
        padding: "0.5rem 0.75rem",
        cursor: "pointer"
    }
};

export default Meeting;
