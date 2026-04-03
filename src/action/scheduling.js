import {createAction} from "@reduxjs/toolkit";
import {
    DELETE_SCHEDULE_MEETING,
    RESCHEDULE_MEETING,
    SCHEDULE_MEETING, UPDATE_MEETING_LOCATION
} from "./actionTypes.js";

export const scheduleMeeting= createAction(SCHEDULE_MEETING);
export const rescheduleMeeting= createAction(RESCHEDULE_MEETING);
export const deleteScheduleMeeting= createAction(DELETE_SCHEDULE_MEETING);
export const updateMeetingLocation= createAction(UPDATE_MEETING_LOCATION);