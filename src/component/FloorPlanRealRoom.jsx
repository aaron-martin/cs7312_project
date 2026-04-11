import React, {useState} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";
import {
    canScheduleMeetingInRoom,
    selectMeetingInRoomAtSelectedTime,
    selectRoomById
} from "../selectors/selectTimeBlockMeetings.js";
import {rescheduleMeeting, scheduleMeeting} from "../action/scheduling.js";
import FloorPlanScheduledMeeting from "./FloorPlanScheduledMeeting.jsx";

const FloorPlanRoom = ({roomId, top, left, width}) => {
    const store = useStore();
    const dispatch = useDispatch();
    const room = useSelector((state) => selectRoomById(state, roomId));
    const scheduledMeeting = useSelector((state) => selectMeetingInRoomAtSelectedTime(state, roomId));
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);

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
        <div style={{
            ...styles.roomCardWrapper,
            top: `${top}px`,
            left: `${left}px`,
            width: width? `${width}px` : undefined
        }}>
            <div
                style={styles.roomCard}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div style={styles.roomName}>
                    <span style={styles.roomNameSpan}>{`${room.name} (${room.zone})`}</span>
                </div>
                <div style={styles.roomMeta}>Capacity: {room.maxOccupancy}</div>
                <div style={styles.roomDescription}>{room.description}</div>
                <FloorPlanScheduledMeeting scheduledMeeting={scheduledMeeting}/>
            </div>
            {isDragOver && <div style={styles.roomCardHover} />}
        </div>
    );
};

const styles = {
    roomCardWrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    roomCard: {
        background: "transparent",
        minHeight: "110px",
        boxSizing: "border-box",
        transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease"
    },
    roomName: {
        fontWeight: "bold",
        marginBottom: "0.35rem",
        textAlign: "center",
    },
    roomNameSpan: {
        background: "white"
    },
    roomMeta: {
        fontSize: "0.85rem",
        color: "#444",
        background: "white",
        width: "fit-content"
    },
    roomDescription: {
        marginTop: "0.5rem",
        fontSize: "0.8rem",
        color: "#555",
        background: "white",
        width: "fit-content"
    },
    roomCardHover: {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        borderRadius: "12px",
        background: "radial-gradient(circle, rgba(91,141,239,0.35) 0%, rgba(91,141,239,0.18) 35%, rgba(91,141,239,0.06) 60%, rgba(91,141,239,0) 100%)",
        boxShadow: "0 0 18px rgba(91,141,239,0.45), inset 0 0 18px rgba(91,141,239,0.25)"
    },
};

export default FloorPlanRoom;