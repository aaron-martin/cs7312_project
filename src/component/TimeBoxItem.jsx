import React from "react";
import {useDispatch} from "react-redux";
import {deleteScheduleMeeting} from "../action/scheduling.js";

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
    console.log('unites', scheduledMeeting.duration, scheduledMeeting.duration / 15);
    const height = (scheduledMeeting.duration / 15) * PX_PER_15_MINUTES;
    console.log('height', height);
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
            <div>{scheduledMeeting.description}</div>
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
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    deleteButton: {
        background: "transparent",
        cursor: "pointer",
        fontWeight: "bold",
        lineHeight: 1,
        borderWidth: 0,
    }
};