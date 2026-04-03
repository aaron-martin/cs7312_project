import TimeBlock from "./TimeBlock.jsx";
import React from "react";
import AddLocationModal from "./AddLocationModal.jsx";

const TIME_SLOTS = [
    "8:00 AM",
    "8:15 AM",
    "8:30 AM",
    "8:45 AM",
    "9:00 AM",
    "9:15 AM",
    "9:30 AM",
    "9:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM"
];

export const PlannerPanel = () => {
    return (
        <div>
            <h2 style={styles.sectionTitle}>Planner</h2>

            <div style={styles.plannerGrid}>
                {TIME_SLOTS.map((time) => (
                    <TimeBlock key={time} time={time} day="Monday" />
                ))}
            </div>
            <AddLocationModal/>
        </div>
    )
}
const styles = {
    sectionTitle: {
        marginTop: 0,
        marginBottom: "0.75rem"
    },
    plannerGrid: {
        display: "flex",
        flexDirection: "column"
    }
};