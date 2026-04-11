import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { deleteScheduleMeeting } from "../action/scheduling.js";

const FloorPlanScheduledMeeting = ({ scheduledMeeting }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(deleteScheduleMeeting(scheduledMeeting.scheduleId));
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
                meetingId: scheduledMeeting.id,
                scheduleId: scheduledMeeting.scheduleId
            })
        );
        event.dataTransfer.effectAllowed = "move";
    };

    if (!scheduledMeeting) {
        return null;
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.header}>
                <strong>{scheduledMeeting.name}</strong>
                <button
                    type="button"
                    onClick={handleDelete}
                    style={styles.deleteButton}
                    aria-label="Delete scheduled meeting"
                >
                    X
                </button>
            </div>

            <div style={styles.meta}>
                <div><strong>Time:</strong> {scheduledMeeting.time}</div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #d0e2f2",
        borderRadius: "8px",
        padding: "0.75rem",
        background: "#ffffff",
        marginTop: "0.75rem",
        cursor: "grab",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)"
    },
    cardHover: {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem"
    },
    deleteButton: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontWeight: "bold",
        lineHeight: 1,
        padding: 0
    },
    meta: {
        marginTop: "0.5rem",
        fontSize: "0.85rem",
        color: "#444",
        display: "grid",
        gap: "0.25rem"
    }
};

export default FloorPlanScheduledMeeting;