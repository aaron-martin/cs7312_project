import { createSelector } from "reselect";

const selectMeetings = (state) => state.meetings;
const selectSchedule = (state) => state.schedule;
const selectTimeSlot = (_, timeSlot) => timeSlot;
const selectMeetingId = (_, meetingId) => meetingId;

export const selectMeetingsForTimeBlock = createSelector(
    [selectMeetings, selectSchedule, selectTimeSlot],
    (meetings, schedule, timeSlot) => {
        const scheduledMeetings = schedule
            .filter((entry) => entry.time === timeSlot.time && entry.day === timeSlot.day);

        return scheduledMeetings.reduce((acc, entry) => {
            const meeting = meetings.find((m) => m.id === entry.meetingId);
            if (meeting) {
                acc.push({
                    ...meeting,
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
    [selectMeetings, selectSchedule, selectTimeSlot],
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