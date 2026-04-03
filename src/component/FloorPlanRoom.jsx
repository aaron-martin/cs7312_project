import React from "react";
import {useSelector} from "react-redux";

const FloorPlanRoom = ({roomId}) => {
    const room = useSelector((state) =>
        state.rooms.items.find((item) => item.id === roomId)
    );

    if (!room) {
        return <div style={styles.roomCard}>Unknown room</div>;
    }

    return (
        <div style={styles.roomCard}>
            <div style={styles.roomName}>{room.name}</div>
            <div style={styles.roomMeta}>Capacity: {room.maxOccupancy}</div>
            <div style={styles.roomDescription}>{room.description}</div>
        </div>
    );
};

const styles = {
    roomCard: {
        border: "1px solid #a8c8e8",
        borderRadius: "8px",
        padding: "0.75rem",
        background: "#f7fbff",
        minHeight: "110px",
        boxSizing: "border-box"
    },
    roomName: {
        fontWeight: "bold",
        marginBottom: "0.35rem"
    },
    roomMeta: {
        fontSize: "0.85rem",
        color: "#444"
    },
    roomDescription: {
        marginTop: "0.5rem",
        fontSize: "0.8rem",
        color: "#555"
    }
};

export default FloorPlanRoom;