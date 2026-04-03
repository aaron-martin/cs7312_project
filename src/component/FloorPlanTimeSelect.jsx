import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TIME_SLOTS} from "../literals.js";
import {updateFloorPlanDayTime} from "../action/settings.js";

const FloorPlanTimeSelect = () => {
    const dispatch = useDispatch();
    const {time: selectedTime} = useSelector((state) => state.settings.floorPlanDayTime);

    return (
        <div style={styles.container}>
            <label htmlFor="floor-plan-time" style={styles.label}>
                Monday
            </label>

            <select
                id="floor-plan-time"
                value={selectedTime}
                onChange={(event) => dispatch(updateFloorPlanDayTime({day: 'Monday', time: event.target.value}))}
                style={styles.select}
            >
                {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        marginBottom: "1rem"
    },
    label: {
        fontWeight: 600,
        color: "#35516b"
    },
    select: {
        minWidth: "140px",
        padding: "0.55rem 0.75rem",
        borderRadius: "8px",
        border: "1px solid #c9d8e6",
        background: "#fff",
        color: "#18324a",
        fontSize: "0.95rem",
        outline: "none"
    }
};

export default FloorPlanTimeSelect;