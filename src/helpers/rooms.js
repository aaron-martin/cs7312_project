export const timeToMinutes = (timeString) => {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
        hours += 12;
    }

    if (period === "AM" && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
};

export const getAvailableRoomsForMeeting = (
    meetings,
    scheduleItems,
    rooms,
    currentMeetingId,
    duration,
    day,
    time,
    numAttendees
) => {
    if (!duration || !day || !time || !numAttendees) {
        return []
    }

    const slotStart = timeToMinutes(time);
    const slotEnd = slotStart + duration;

    const isOverlapping = (room) => {
        return scheduleItems.some((entry) => {
            if (entry.roomId !== room.id ) {
                return false;
            }
            const entryMeeting = meetings.find((m) => m.id === entry.meetingId);
            if (!entryMeeting || entryMeeting.id === currentMeetingId) {
                return false;
            }
            const entryMeetingStart = timeToMinutes(entry.time);
            const entryMeetingEnd = entryMeetingStart + entryMeeting.duration;

            return entryMeetingStart >= slotStart && entryMeetingStart < slotEnd ||
                entryMeetingEnd > slotStart && entryMeetingEnd <= slotEnd;
        });
    };

    return rooms.filter((room) => {
        if (numAttendees > room.maxOccupancy) {
            return false;
        }

        return !isOverlapping(room);
    });
};
