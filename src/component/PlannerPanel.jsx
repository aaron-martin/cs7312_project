import TimeBlock from "./TimeBlock.jsx";
import React from "react";
import AddLocationModal from "./AddLocationModal.jsx";
import {TIME_SLOTS} from "../literals.js";

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