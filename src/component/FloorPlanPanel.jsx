import React from "react";
import FloorPlanRoom from "./FloorPlanRoom.jsx";
import FloorPlanTimeSelect from "./FloorPlanTimeSelect.jsx";

const FLOORS = [
    {
        label: "Floor 1",
        leftRooms: ["1", "2", "3", "4", "5"],
        rightRooms: ["6", "7", "8", "9", "10"]
    },
    {
        label: "Floor 2",
        leftRooms: ["11", "12", "13", "14", "15"],
        rightRooms: ["16", "17", "18", "19"]
    }
];

const FloorPlanPanel = () => {
    return (
        <div>
            <h2 style={styles.sectionTitle}>Floor Plan</h2>

            <div style={styles.floors}>
                {FLOORS.map((floor) => (
                    <section key={floor.label} style={styles.floorSection}>
                        <h3 style={styles.floorTitle}>{floor.label}</h3>
                        <FloorPlanTimeSelect/>
                        <div style={styles.floorLayout}>
                            <div style={styles.roomColumn}>
                                {floor.leftRooms.map((roomId) => (
                                    <FloorPlanRoom key={roomId} roomId={roomId} />
                                ))}
                            </div>

                            <div style={styles.hallway}>
                                <div style={styles.hallwayLabel}>Hallway</div>
                            </div>

                            <div style={styles.roomColumn}>
                                {floor.rightRooms.map((roomId) => (
                                    <FloorPlanRoom key={roomId} roomId={roomId} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

const styles = {
    sectionTitle: {
        marginTop: 0,
        marginBottom: "0.75rem"
    },
    floors: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
    floorSection: {
        border: "1px solid #d7d7d7",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff"
    },
    floorTitle: {
        marginTop: 0,
        marginBottom: "0.75rem"
    },
    floorLayout: {
        display: "grid",
        gridTemplateColumns: "1fr 140px 1fr",
        gap: "0.75rem",
        alignItems: "stretch"
    },
    roomColumn: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "0.75rem"
    },
    hallway: {
        border: "2px dashed #9db7cf",
        borderRadius: "10px",
        background: "#f4f8fc",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    hallwayLabel: {
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        fontWeight: "bold",
        letterSpacing: "0.08em",
        color: "#567"
    }
};

export default FloorPlanPanel;