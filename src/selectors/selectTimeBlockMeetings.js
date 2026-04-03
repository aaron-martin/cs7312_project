import { createSelector } from "reselect";

const selectMeetings = (state) => state.meetings;
const selectScheduleItems = (state) => state.schedule.items;
const selectRooms = (state) => state.rooms.items;
const selectTimeSlot = (_, timeSlot) => timeSlot;
const selectMeetingId = (_, meetingId) => meetingId;
const selectRoomId = (_, roomId) => roomId;
const selectLocationModalSetting = (state) => state.settings.addLocationModalSetting;
const selectFloorPlanDayTime = (state) => state.settings.floorPlanDayTime;

export const selectRoomById = (state, roomId) => state.rooms.items.find((item) => item.id === roomId);
export const scheduledItemById = (state, scheduledId) => state.schedule.items.find((item) => item.id === scheduledId);

export const selectMeetingsForTimeBlock = createSelector(
    [selectMeetings, selectScheduleItems, selectRooms, selectTimeSlot],
    (meetings, schedule, rooms, timeSlot) => {
        const scheduledMeetings = schedule
            .filter((entry) => entry.time === timeSlot.time && entry.day === timeSlot.day);

        return scheduledMeetings.reduce((acc, entry) => {
            const meeting = meetings.find((m) => m.id === entry.meetingId);
            const room = rooms.find((r) => r.id === entry.roomId) || {};
            if (meeting) {
                acc.push({
                    ...meeting,
                    roomId: room.id,
                    roomName: `${room.name} (${room.zone})`,
                    time: entry.time,
                    day: entry.day,
                    scheduleId: entry.id
                });
            }
            return acc;
        }, [])
    }
);

const timeToMinutes = (timeString) => {
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

export const selectOverlapPlaceholderCount = createSelector(
    [selectMeetings, selectScheduleItems, selectTimeSlot],
    (meetings, schedule, timeSlot) => {
        const currentTime = timeToMinutes(timeSlot.time);

        const scheduledMeetings = schedule
            .map((entry) => {
                const meeting = meetings.find((m) => m.id === entry.meetingId);
                return meeting
                    ? {
                        ...meeting,
                        time: entry.time,
                        day: entry.day,
                        scheduleId: entry.id
                    }
                    : null;
            })
            .filter(Boolean);

        const overlappingMeetings = scheduledMeetings.filter((meeting) => {
            if (meeting.day !== timeSlot.day) {
                return false;
            }

            const meetingStart = timeToMinutes(meeting.time);
            const meetingEnd = meetingStart + meeting.duration;

            return meetingStart < currentTime && meetingEnd > currentTime;
        });

        return overlappingMeetings.length;
    }
);

export const selectTimeSlotForMeeting = createSelector(
    [selectScheduleItems, selectMeetingId],
    (scheduleItems, meetingId) => {
        const scheduledEntry = scheduleItems.find(
            (entry) => entry.meetingId === meetingId
        );

        if (!scheduledEntry) {
            return null;
        }

        return {
            scheduleId: scheduledEntry.id,
            time: scheduledEntry.time,
            day: scheduledEntry.day
        };
    }
);

export const selectRoomByMeetingId = createSelector(
    [selectScheduleItems, selectRooms, selectMeetingId],
    (scheduleItems, rooms, meetingId) => {
        const scheduledEntry = scheduleItems.find((entry) => entry.meetingId === meetingId);

        if (!scheduledEntry) {
            return null;
        }

        const room = rooms.find((entry) => entry.id === scheduledEntry.roomId);

        if (!room) {
            return null;
        }

        return {
            name: room.name,
            zone: room.zone
        };
    }
);

export const selectScheduleItemByOpenModal = createSelector(
    [selectScheduleItems, selectLocationModalSetting],
    (scheduleItems, scheduleId) => {
        if (!scheduleId) {
            return null;
        }
        return scheduleItems.find((entry) => entry.id === scheduleId);
    }
)

export const selectAvailableRoomsForModal = createSelector(
    [selectMeetings, selectScheduleItems, selectRooms, selectScheduleItemByOpenModal],
    (meetings, scheduleItems, rooms, scheduleItem) => {
        if (!scheduleItem) {
            return []
        }

        const selectedMeeting = meetings.find((meeting) => meeting.id === scheduleItem.meetingId);
        if (!selectedMeeting) {
            return [];
        }

        const slotStart = timeToMinutes(scheduleItem.time);
        const slotEnd = slotStart + selectedMeeting.duration;

        const isOverlapping = (room) => {
            return scheduleItems.some((entry) => {
                if (entry.roomId !== room.id ) {
                    return false;
                }
                const entryMeeting = meetings.find((m) => m.id === entry.meetingId);
                if (!entryMeeting) {
                    return false;
                }
                const entryMeetingStart = timeToMinutes(entry.time);
                const entryMeetingEnd = entryMeetingStart + entryMeeting.duration;

                return entryMeetingStart >= slotStart && entryMeetingStart < slotEnd ||
                    entryMeetingEnd > slotStart && entryMeetingEnd <= slotEnd;
            });
        };

        return rooms.filter((room) => {
            if (selectedMeeting.numAttendees > room.maxOccupancy) {
                return false;
            }

            return !isOverlapping(room);
        });
    }
);

export const selectRoomByOpenModal = createSelector(
    [selectScheduleItems, selectRooms, selectScheduleItemByOpenModal],
    (scheduledItem, rooms, scheduledEntry) => {
        if (!scheduledEntry) {
            return null;
        }

        if (!scheduledEntry || !scheduledEntry.roomId) {
            return null;
        }

        const room = rooms.find((entry) => entry.id === scheduledEntry.roomId);

        return {
            name: room.name,
            zone: room.zone
        };
    }
);

export const selectMeetingByOpenModal = createSelector(
    [selectScheduleItems, selectMeetings, selectScheduleItemByOpenModal],
    (scheduledItem, meetings, scheduledEntry) => {
        if (!scheduledEntry) {
            return null;
        }

        return meetings.find((entry) => entry.id === scheduledEntry.meetingId);
    }
);

export const canScheduleMeetingInRoom = (state, meetingId, roomId, scheduleId) => {
    const newMeeting = state.meetings.find((item) => item.id === meetingId);
    const room = state.rooms.items.find((item) => item.id === roomId);
    const {
        day,
        time
    } = selectFloorPlanDayTime(state);
    const scheduledItems = selectScheduleItems(state);
    const scheduledItem = scheduledItemById(state, scheduleId);
    const floorPlanDayTime = selectFloorPlanDayTime(state);

    if (!newMeeting || !room) {
        return false;
    }

    if (scheduledItem && (scheduledItem.time !== floorPlanDayTime.time || scheduledItem.day !== floorPlanDayTime.day)) {
        return false;
    }

    // capacity check
    if (newMeeting.numAttendees && newMeeting.numAttendees > room.maxOccupancy) {
        return false;
    }

    // simple schedule conflict check
    const newStart = timeToMinutes(time);
    const newEnd = newStart + newMeeting.duration;

    const overlaps = scheduledItems.some((entry) => {
        if (entry.roomId !== roomId || entry.day !== day) {
            return false;
        }

        const existingMeeting = state.meetings.find((item) => item.id === entry.meetingId);
        if (!existingMeeting) {
            return false;
        }

        const existingStart = timeToMinutes(entry.time);
        const existingEnd = existingStart + existingMeeting.duration;

        return newStart < existingEnd && newEnd > existingStart;
    });

    return !overlaps;
};

export const selectMeetingInRoomAtSelectedTime = createSelector(
    [selectMeetings, selectScheduleItems, selectRooms, selectFloorPlanDayTime, selectRoomId],
    (meetings, scheduleItems, rooms, timeSlot, roomId) => {
        if (!timeSlot || !roomId) {
            return null;
        }

        const currentTime = timeToMinutes(timeSlot.time);
        const currentDay = timeSlot.day;

        const scheduledEntry = scheduleItems.find((entry) => {
            if (entry.roomId !== roomId || entry.day !== currentDay) {
                return false;
            }

            const meeting = meetings.find((item) => item.id === entry.meetingId);
            if (!meeting) {
                return false;
            }

            const start = timeToMinutes(entry.time);
            const end = start + meeting.duration;

            return currentTime >= start && currentTime < end;
        });

        if (!scheduledEntry) {
            return null;
        }

        const meeting = meetings.find((item) => item.id === scheduledEntry.meetingId);

        if (!meeting) {
            return null;
        }

        return {
            ...meeting,
            time: scheduledEntry.time,
            day: scheduledEntry.day,
            scheduleId: scheduledEntry.id
        };
    }
);