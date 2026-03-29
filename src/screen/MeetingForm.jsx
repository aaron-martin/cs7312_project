import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createMeeting} from "../action/meetings.js";

const MeetingForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        numAttendees: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(createMeeting({
            id: crypto.randomUUID(),
            name: formData.name,
            description: formData.description,
            duration: Number(formData.duration),
            numAttendees: Number(formData.numAttendees)
        }));

        setFormData({
            name: "",
            description: "",
            duration: "",
            numAttendees: ""
        });
    };

    return (
        <div style={styles.page}>
            <h1>Meeting Form</h1>

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
                    Add Meeting
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