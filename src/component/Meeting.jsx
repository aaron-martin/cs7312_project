import React from "react";

const Meeting = ({meeting}) => {
    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", JSON.stringify({meetingId: meeting.id}));
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <div
            draggable
            key={meeting.id} style={styles.card}
            onDragStart={handleDragStart}
        >
            <div>
                <strong>Name:</strong> {meeting.name}
            </div>
            <div>
                <strong>Description:</strong> {meeting.description}
            </div>
            <div>
                <strong>Duration:</strong> {meeting.duration}
            </div>
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        padding: "0.75rem",
        marginBottom: "0.75rem",
        background: "#fafafa"
    }

};

export default Meeting;
