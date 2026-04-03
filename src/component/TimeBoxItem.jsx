import React from "react";
import {useDispatch} from "react-redux";
import {deleteScheduleMeeting} from "../action/scheduling.js";
import {openAddLocationModal} from "../action/settings.js";

const PX_PER_15_MINUTES = 40;

const TimeBoxItem = ({scheduledMeeting}) => {
    const dispatch = useDispatch();
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
            style={{...styles.item, height: `${height}px`}}
            onDragStart={handleDragStart}
        >
            <div style={styles.deleteButtonContainer}>
                <button type="button" style={styles.deleteButton} onClick={handleDelete}>
                    X
                </button>
            </div>
            <div><strong>{scheduledMeeting.name}</strong></div>
            <div style={styles.locationRow}>
                <span style={styles.locationName}>
                    <strong>room:</strong>
                    {scheduledMeeting.roomId &&
                       <span>{scheduledMeeting.roomName}</span>
                    }
                </span>
                <button type="button" onClick={openModal}>+</button>
            </div>
        </div>
    )
}
export default TimeBoxItem;

const styles = {
    item: {
        width: "120px",
        borderRadius: "6px",
        background: "#dfefff",
        border: "1px solid #a8c8e8",
        fontSize: "0.85rem",
        zIndex: 99,
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
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        wordBreak: "break-word"
    },
    locationName: {
        maxWidth: "70%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
};