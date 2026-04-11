import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteScheduleMeeting} from "../action/scheduling.js";
import {openAddLocationModal} from "../action/settings.js";

const PX_PER_15_MINUTES = 40;

const TimeBoxItem = ({scheduledMeeting}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({meetingId: scheduledMeeting.id, scheduleId: scheduledMeeting.scheduleId})
        );
        event.dataTransfer.effectAllowed = "move";
    };
    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(deleteScheduleMeeting(scheduledMeeting.scheduleId));
    };
    const openModal = (event) => {
        event.stopPropagation();
        dispatch(openAddLocationModal(scheduledMeeting.scheduleId));
    }
    const height = (scheduledMeeting.duration / 15) * PX_PER_15_MINUTES;
    return (
        <div
            draggable
            style={{
                ...styles.item,
                height: `${height}px`,
                ...(isHovered ? styles.itemHover : {})
            }}
            onDragStart={handleDragStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.deleteButtonContainer}>
                <button type="button" style={styles.deleteButton} onClick={handleDelete}>
                    X
                </button>
            </div>
            <div><strong>{scheduledMeeting.name}</strong></div>
            <div style={styles.locationRow}>
                <span>
                    <strong>room: </strong>
                    {scheduledMeeting.roomId ? scheduledMeeting.roomName : ""}
                </span>
            </div>
            <button
                style={styles.addRoomButton}
                type="button"
                onClick={openModal}
            >
                {scheduledMeeting.roomId ? "Edit Room" : "Add Room"}
            </button>
        </div>
    )
}
export default TimeBoxItem;

const styles = {
    item: {
        position: "relative",
        width: "120px",
        borderRadius: "6px",
        background: "#dfefff",
        border: "1px solid #a8c8e8",
        fontSize: "0.85rem",
        zIndex: 99,
        cursor: "grab",
    },
    itemHover: {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
    },
    deleteButtonContainer: {
        float: "right",
        right: "90px",
        width: "1.25rem",
    },
    deleteButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.25rem",
        height: "1.25rem",
        padding: 0,
        background: "transparent",
        cursor: "pointer",
        fontWeight: "bold",
        lineHeight: 1,
        border: "none",
        borderRadius: "50%"
    },
    locationRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.15rem",
        width: "100%",
        minWidth: 0
    },
    locationLabel: {
        whiteSpace: "nowrap"
    },
    locationName: {
        width: "100%",
        minWidth: 0,
        whiteSpace: "normal",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        lineHeight: 1.2
    },
    addRoomButton: {
        position: "absolute",
        right: "0.35rem",
        bottom: "0.35rem",
        padding: 0,
        border: "none",
        background: "transparent",
        color: "#2563eb",
        fontSize: "0.75rem",
        fontWeight: 500,
        cursor: "pointer",
        textDecoration: "underline",
        lineHeight: 1
    }
};
