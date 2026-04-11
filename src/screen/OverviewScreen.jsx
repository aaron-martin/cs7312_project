import React from "react";
import { useSelector } from "react-redux";
import Meeting from "../component/Meeting.jsx";
import {PlannerPanel} from "../component/PlannerPanel.jsx";
import PanelToggle from "../component/PanelToggle.jsx";
import {FLOOR_PLAN_PANEL} from "../reducer/activePanel.js";
import FloorPlanPanel from "../component/FloorPlanPanelReal.jsx";

const OverviewScreen = () => {
    const meetings = useSelector((state) => state.meetings);
    const activeView = useSelector((state) => state.settings.activePanel)

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Overview</h1>

            <div style={styles.layout}>
                <section style={styles.listPanel}>
                    <h2 style={styles.sectionTitle}>Meetings</h2>

                    <div style={styles.scrollList}>
                        {meetings.length === 0 ? (
                            <p style={styles.emptyText}>No meetings added yet.</p>
                        ) : (
                            meetings.map((meeting) => (
                                <Meeting key={meeting.id} meeting={meeting} />
                            ))
                        )}
                    </div>
                </section>

                <section style={styles.plannerPanel}>
                    <PanelToggle/>
                    {activeView === FLOOR_PLAN_PANEL ? <FloorPlanPanel/> : <PlannerPanel />}
                </section>
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: "1.5rem",
        fontFamily: "Arial, sans-serif"
    },
    title: {
        marginBottom: "1rem"
    },
    layout: {
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: "1rem",
        alignItems: "start"
    },
    listPanel: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff"
    },
    plannerPanel: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff"
    },
    sectionTitle: {
        marginTop: 0,
        marginBottom: "0.75rem"
    },
    scrollList: {
        maxHeight: "500px",
        overflowY: "auto",
        paddingRight: "0.25rem"
    },
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        padding: "0.75rem",
        marginBottom: "0.75rem",
        background: "#fafafa"
    },
    emptyText: {
        color: "#666"
    },
    plannerGrid: {
        display: "flex",
        flexDirection: "column"
    },
    timeRow: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gap: "0.75rem",
        alignItems: "center"
    },
    timeLabel: {
        fontSize: "0.9rem",
        fontWeight: "bold"
    },
    timeBlock: {
        minHeight: "40px",
        border: "1px dashed #bbb",
        borderRadius: "6px",
        background: "#fdfdfd"
    }
};

export default OverviewScreen;