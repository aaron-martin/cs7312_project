import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {togglePanelView} from "../action/settings.js";
import {FLOOR_PLAN_PANEL, PLANNER_PANEL} from "../reducer/activePanel.js";

const PanelToggle = () => {
    const dispatch = useDispatch();
    const activeView = useSelector((state) => state.settings.activePanel);
    const onChange = (view) => {
        dispatch(togglePanelView(view));
    }
    return (
        <div style={styles.wrapper} role="tablist" aria-label="Panel view toggle">
            <button
                type="button"
                role="tab"
                aria-selected={activeView === PLANNER_PANEL}
                onClick={() => onChange(PLANNER_PANEL)}
                style={{
                    ...styles.button,
                    ...(activeView === PLANNER_PANEL ? styles.buttonActive : {})
                }}
            >
                Planner
            </button>

            <button
                type="button"
                role="tab"
                aria-selected={activeView === FLOOR_PLAN_PANEL}
                onClick={() => onChange(FLOOR_PLAN_PANEL)}
                style={{
                    ...styles.button,
                    ...(activeView === FLOOR_PLAN_PANEL ? styles.buttonActive : {})
                }}
            >
                Floor Plan
            </button>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "inline-flex",
        padding: "4px",
        borderRadius: "999px",
        background: "#eef3f8",
        border: "1px solid #c9d8e6",
        gap: "4px",
        marginBottom: "1rem"
    },
    button: {
        border: "none",
        background: "transparent",
        color: "#35516b",
        padding: "0.6rem 1rem",
        borderRadius: "999px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "0.95rem",
        lineHeight: 1,
        transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease"
    },
    buttonActive: {
        background: "#ffffff",
        color: "#18324a",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)"
    }
};

export default PanelToggle;