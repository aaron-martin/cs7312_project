import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {rescheduleMeeting, scheduleMeeting} from "../action/scheduling.js";
import {selectMeetingsForTimeBlock, selectOverlapPlaceholderCount} from "../selectors/selectTimeBlockMeetings.js";
import TimeBoxItem from "./TimeBoxItem.jsx";

const TimeBlock = ({time, day}) => {
    const scheduledMeetings = useSelector((state) => selectMeetingsForTimeBlock(state, {time, day}));
    const placeHolders = useSelector((state) => selectOverlapPlaceholderCount(state, {time, day}));
    const dispatch = useDispatch();
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
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div style={styles.timeLabel}>{time}</div>
            <div style={{
                   ...styles.timeBlock,
                ...(isDragOver ? styles.timeBlockActive : {})
                }}
            >
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
    timeBlockActive: {
        background: "#eaf4ff",
        boxShadow: "inset 0 0 0 2px #5b8def"
    },
    placeholder: {
        width: "120px",
        minWidth: "120px",
        height: "1px",
        visibility: "hidden",
        flexShrink: 0
    }
};