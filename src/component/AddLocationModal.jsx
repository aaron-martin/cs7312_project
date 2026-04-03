import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMeetingLocation } from "../action/scheduling.js";
import { closeAddLocationModal } from "../action/settings.js";
import {
    selectAvailableRoomsForModal,
    selectRoomByOpenModal,
    selectMeetingByOpenModal, selectScheduleItemByOpenModal
} from "../selectors/selectTimeBlockMeetings.js";

const AddLocationModal = () => {
    const dispatch = useDispatch();

    const selectedItem = useSelector((state) => selectScheduleItemByOpenModal(state));
    const availableRooms = useSelector((state) => selectAvailableRoomsForModal(state));
    const currentRoom = useSelector((state) => selectRoomByOpenModal(state));
    const meeting = useSelector((state) => selectMeetingByOpenModal(state));
    if (!selectedItem) {
        return null;
    }
    const handleSelectRoom = (roomId) => {
        dispatch(updateMeetingLocation({
            scheduleId: selectedItem.id,
            roomId
        }));
    };

    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Add / Update Location</h3>
                    <button
                        type="button"
                        style={styles.closeButton}
                        onClick={() => dispatch(closeAddLocationModal())}
                    >
                        ×
                    </button>
                </div>

                <div style={styles.info}>
                    <div><strong>Meeting:</strong> {meeting.name}</div>
                    <div>
                        <strong>Time:</strong> {selectedItem.day}, {selectedItem.time}
                    </div>
                    <div>
                        <strong>Current location:</strong>{" "}
                        {currentRoom ? `${currentRoom.name} (${currentRoom.zone})` : "None selected"}
                    </div>
                </div>

                <div style={styles.roomList}>
                    {availableRooms.map((room) => {
                        const isCurrentRoom = currentRoom && room.name === currentRoom.name;

                        return (
                            <button
                                key={room.id}
                                type="button"
                                style={{
                                    ...styles.roomCard,
                                    ...(isCurrentRoom ? styles.roomCardSelected : {})
                                }}
                                onClick={() => handleSelectRoom(room.id)}
                            >
                                <div style={styles.roomName}>{room.name}</div>
                                <div style={styles.roomMeta}>Zone: {room.zone}</div>
                                <div style={styles.roomMeta}>Max occupancy: {room.maxOccupancy}</div>
                                <div style={styles.roomDescription}>{room.description}</div>
                                {isCurrentRoom && <div style={styles.currentTag}>Current room</div>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AddLocationModal;

const styles = {
    backdrop: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: 1000
    },
    modal: {
        width: "min(640px, 92%)",
        maxHeight: "85%",
        overflowY: "auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "1rem",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)"
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
    },
    title: {
        margin: 0
    },
    closeButton: {
        border: "none",
        background: "transparent",
        fontSize: "1.75rem",
        cursor: "pointer",
        lineHeight: 1
    },
    info: {
        display: "grid",
        gap: "0.35rem",
        marginBottom: "1rem"
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "1rem"
    },
    cancelButton: {
        border: "1px solid #cfd8e3",
        backgroundColor: "#f9fbfd",
        borderRadius: "6px",
        padding: "0.5rem 0.85rem",
        cursor: "pointer"
    },
    roomList: {
        display: "grid",
        gap: "0.75rem"
    },
    roomCard: {
        textAlign: "left",
        border: "1px solid #cfd8e3",
        borderRadius: "8px",
        backgroundColor: "#f9fbfd",
        padding: "0.85rem",
        cursor: "pointer"
    },
    roomCardSelected: {
        borderColor: "#5b8def",
        backgroundColor: "#edf4ff"
    },
    roomName: {
        fontWeight: 700,
        marginBottom: "0.25rem"
    },
    roomMeta: {
        fontSize: "0.9rem",
        marginBottom: "0.15rem"
    },
    roomDescription: {
        fontSize: "0.88rem",
        color: "#4b5563",
        marginTop: "0.25rem"
    },
    currentTag: {
        marginTop: "0.5rem",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: "#2563eb"
    }
};
