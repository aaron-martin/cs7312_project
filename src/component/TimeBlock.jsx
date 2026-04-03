import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {rescheduleMeeting, scheduleMeeting} from "../action/scheduling.js";
import {selectMeetingsForTimeBlock, selectOverlapPlaceholderCount} from "../selectors/selectTimeBlockMeetings.js";
import TimeBoxItem from "./TimeBoxItem.jsx";

const TimeBlock = ({time, day}) => {
    const scheduledMeetings = useSelector((state) => selectMeetingsForTimeBlock(state, {time, day}));
    const placeHolders = useSelector((state) => selectOverlapPlaceholderCount(state, {time, day}));
    const dispatch = useDispatch();
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const {
            meetingId,
            scheduleId
        } = JSON.parse(String(event.dataTransfer.getData("text/plain")));

        if (scheduleId && meetingId) {
            dispatch(rescheduleMeeting({
                scheduleId,
                time,
                day
            }))
            return;
        }

        if (meetingId) {
            dispatch(scheduleMeeting({
                id: crypto.randomUUID(),
                meetingId,
                time,
                day
            }));
        }
    };

    return (
        <div
            style={styles.timeRow}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div style={styles.timeLabel}>{time}</div>
            <div style={styles.timeBlock}>
                {
                    Array.from({length: placeHolders}).map((_, index) => (<div key={index} style={styles.placeholder}/>))
                }
                {scheduledMeetings.map((meeting) => (
                    <TimeBoxItem key={meeting.id} scheduledMeeting={meeting}/>
                ))}
            </div>
        </div>
    )
}
export default TimeBlock;

const styles = {
    timeRow: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        // gap: "0.75rem",
        alignItems: "center"
    },
    timeLabel: {
        fontSize: "0.9rem",
        fontWeight: "bold"
    },
    timeBlock: {
        height: "40px",
        borderTop: "1px dashed #bbb",
        background: "#fdfdfd",
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
        overflow: "visible",
        position: "relative"
    },
    placeholder: {
        width: "120px",
        minWidth: "120px",
        height: "1px",
        visibility: "hidden",
        flexShrink: 0
    }
};