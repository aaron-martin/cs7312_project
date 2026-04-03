import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createMeeting, updateMeeting} from "../action/meetings.js";
import {selectMeetingById} from "../selectors/selectTimeBlockMeetings.js";

const MeetingForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const meetingToEdit = useSelector((state) => selectMeetingById(state, id));

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        numAttendees: ""
    });

    React.useEffect(() => {
        if (meetingToEdit) {
            setFormData({
                name: meetingToEdit.name ?? "",
                description: meetingToEdit.description ?? "",
                duration: meetingToEdit.duration ?? "",
                numAttendees: meetingToEdit.numAttendees ?? ""
            });
        } else {
            setFormData({
                name: "",
                description: "",
                duration: "",
                numAttendees: ""
            });
        }
    }, [meetingToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            id: meetingToEdit?.id ?? crypto.randomUUID(),
            name: formData.name,
            description: formData.description,
            duration: Number(formData.duration),
            numAttendees: Number(formData.numAttendees)
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
            numAttendees: ""
        });
    };

    return (
        <div style={styles.page}>
            <h1>{meetingToEdit ? "Edit Meeting" : "Meeting Form"}</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Name
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
                    Expected Attendees
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