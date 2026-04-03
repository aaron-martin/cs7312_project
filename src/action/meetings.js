import {createAction} from "@reduxjs/toolkit";
import {CREATE_MEETING, UPDATE_MEETING_LOCATION} from "./actionTypes.js";

export const createMeeting = createAction(CREATE_MEETING)
export const updateMeetingLocation = createAction(UPDATE_MEETING_LOCATION)