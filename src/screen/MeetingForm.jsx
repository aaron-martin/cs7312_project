import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMeeting, updateMeeting } from "../action/meetings.js";
import {
    selectMeetingById,
    selectScheduleItemsByMeetingId,
    selectMeetings,
    selectScheduleItems,
    selectRooms

} from "../selectors/selectTimeBlockMeetings.js";
import { TIME_SLOTS } from "../literals.js";
import {getAvailableRoomsForMeeting} from "../helpers/rooms.js";

const MeetingForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const meetingToEdit = useSelector((state) => selectMeetingById(state, id));
    const scheduledItem = useSelector((state) => selectScheduleItemsByMeetingId(state, id));
    const meetings = useSelector((state) => selectMeetings(state));
    const scheduledItems = useSelector((state) => selectScheduleItems(state));
    const rooms = useSelector((state) => selectRooms(state));

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        numAttendees: "",
        day: "",
        time: "",
        roomId: ""
    });

    useEffect(() => {
        if (meetingToEdit) {
            setFormData((prevState) => ({
                ...prevState,
                name: meetingToEdit.name ?? "",
                description: meetingToEdit.description ?? "",
                duration: meetingToEdit.duration ?? "",
                numAttendees: meetingToEdit.numAttendees ?? ""
            }));
        } else {
            setFormData({
                name: "",
                description: "",
                duration: "",
                numAttendees: "",
                day: "",
                time: "",
                roomId: ""
            });
        }
    }, [meetingToEdit]);

    useEffect(() => {
        if (scheduledItem) {
            console.log("scheduledItem", scheduledItem);
            setFormData((prevState) => ({
                ...prevState,
                day: scheduledItem.day ?? "",
                time: scheduledItem.time ?? "",
                roomId: scheduledItem.roomId ?? ""
            }));
        }
    }, [scheduledItem?.id, scheduledItem?.day, scheduledItem?.time, scheduledItem?.roomId]);

    const availableRooms = useMemo(() => {
        return getAvailableRoomsForMeeting(
            meetings,
            scheduledItems,
            rooms,
            id,
            formData.duration,
            formData.day,
            formData.time,
            formData.numAttendees
        );
    }, [
        id,
        formData.duration,
        formData.day,
        formData.time,
        formData.numAttendees
    ]);

    useEffect(() => {
        if (
            formData.roomId &&
            !availableRooms.some((room) => room.id === formData.roomId)
        ) {
            setFormData((prevState) => ({
                ...prevState,
                roomId: ""
            }));
        }
    }, [availableRooms]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => {
            if (name === "day") {
                return {
                    ...prev,
                    day: value,
                    time: value ? prev.time : ""
                };
            }

            return {
                ...prev,
                [name]: value
            };
        });
    };

    const getPayloadScheduleId = () => {
        if (scheduledItem) {
            return scheduledItem.id;
        }
        if (formData.day && formData.time) {
            return crypto.randomUUID();
        }
        return undefined;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const hasSchedule = formData.day && formData.time;

        const payload = {
            id: meetingToEdit?.id ?? crypto.randomUUID(),
            name: formData.name,
            description: formData.description,
            duration: Number(formData.duration),
            numAttendees: Number(formData.numAttendees),
            day: hasSchedule ? formData.day : "",
            time: hasSchedule ? formData.time : "",
            roomId: hasSchedule ? formData.roomId || "" : "",
            scheduleId: getPayloadScheduleId()
        };

        if (meetingToEdit) {
            dispatch(updateMeeting(payload));
        } else {
            dispatch(createMeeting(payload));
        }

        setFormData({
            name: "",
            description: "",
            duration: "",
            numAttendees: "",
            day: "",
            time: "",
            roomId: ""
        });
    };

    return (
        <div style={styles.page}>
            <h1>{meetingToEdit ? "Edit Meeting" : "Meeting Form"}</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Title
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Description
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Duration (minutes)
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        style={styles.input}
                        min="15"
                        step="15"
                        required
                    />
                </label>

                <label style={styles.label}>
                    Expected Number of Attendees
                    <input
                        type="number"
                        name="numAttendees"
                        value={formData.numAttendees}
                        onChange={handleChange}
                        style={styles.input}
                        min="1"
                        required
                    />
                </label>

                <label style={styles.label}>
                    Day
                    <select
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="">No day selected</option>
                        <option value="Monday">Monday</option>
                    </select>
                </label>

                <label style={styles.label}>
                    Time
                    <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        style={styles.input}
                        disabled={!formData.day}
                        required={!!formData.day}
                    >
                        <option value="">No time selected</option>
                        {TIME_SLOTS.map((timeSlot) => (
                            <option key={timeSlot} value={timeSlot}>
                                {timeSlot}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={styles.label}>
                    Room
                    <select
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        style={styles.input}
                        disabled={!formData.day || !formData.time || availableRooms.length === 0}
                    >
                        <option value="">No room selected</option>
                        {availableRooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name} ({room.zone}) - {room.maxOccupancy}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" style={styles.button}>
                    {meetingToEdit ? "Update Meeting" : "Add Meeting"}
                </button>
            </form>
        </div>
    );
};

const styles = {
    page: {
        padding: "1.5rem",
        fontFamily: "Arial, sans-serif"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "420px"
    },
    label: {
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        fontWeight: "bold"
    },
    input: {
        padding: "0.5rem",
        fontSize: "1rem"
    },
    textarea: {
        padding: "0.5rem",
        fontSize: "1rem",
        minHeight: "100px",
        resize: "vertical"
    },
    button: {
        padding: "0.75rem 1rem",
        fontSize: "1rem",
        cursor: "pointer"
    }
};

export default MeetingForm;