import React from "react";
import {useDispatch, useSelector, useStore} from "react-redux";
import {
    canScheduleMeetingInRoom,
    selectMeetingInRoomAtSelectedTime,
    selectRoomById
} from "../selectors/selectTimeBlockMeetings.js";
import {rescheduleMeeting, scheduleMeeting} from "../action/scheduling.js";
import FloorPlanScheduledMeeting from "./FloorPlanScheduledMeeting.jsx";

const FloorPlanRoom = ({roomId}) => {
    const store = useStore();
    const dispatch = useDispatch();
    const room = useSelector((state) => selectRoomById(state, roomId));
    const scheduledMeeting = useSelector((state) => selectMeetingInRoomAtSelectedTime(state, roomId));

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (scheduledMeeting) return;

        const {
            meetingId,
            scheduleId
        } =  JSON.parse(event.dataTransfer.getData("text/plain"));

        const state = store.getState();

        const canAccept = canScheduleMeetingInRoom(
            state,
            meetingId,
            roomId,
            scheduleId
        );

        if (!canAccept) {
            console.log("Meeting cannot be placed in this room.");
            return;
        }

        if (scheduleId) {
            dispatch(rescheduleMeeting({
                id: crypto.randomUUID(),
                meetingId,
                scheduleId,
                roomId,
                time: state.settings.floorPlanDayTime.time,
                day: state.settings.floorPlanDayTime.day,
            }));
            return
        }

        dispatch(scheduleMeeting({
            id: crypto.randomUUID(),
            meetingId,
            roomId,
            time: state.settings.floorPlanDayTime.time,
            day: state.settings.floorPlanDayTime.day,
        }));
    };

    if (!room) {
        return <div style={styles.roomCard}>Unknown room</div>;
    }

    return (
        <div
            style={styles.roomCard}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div style={styles.roomName}>{`${room.name} (${room.zone})`}</div>
            <div style={styles.roomMeta}>Capacity: {room.maxOccupancy}</div>
            <div style={styles.roomDescription}>{room.description}</div>
            <FloorPlanScheduledMeeting scheduledMeeting={scheduledMeeting}/>
        </div>
    );
};

const styles = {
    roomCard: {
        border: "1px solid #a8c8e8",
        borderRadius: "8px",
        padding: "0.75rem",
        background: "#f7fbff",
        minHeight: "110px",
        boxSizing: "border-box",
        transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease"
    },
    roomName: {
        fontWeight: "bold",
        marginBottom: "0.35rem"
    },
    roomMeta: {
        fontSize: "0.85rem",
        color: "#444"
    },
    roomDescription: {
        marginTop: "0.5rem",
        fontSize: "0.8rem",
        color: "#555"
    }
};

export default FloorPlanRoom;