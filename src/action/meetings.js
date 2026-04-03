import {createAction} from "@reduxjs/toolkit";
import {CREATE_MEETING, UPDATE_MEETING, UPDATE_MEETING_LOCATION} from "./actionTypes.js";

export const createMeeting = createAction(CREATE_MEETING);
export const updateMeeting = createAction(UPDATE_MEETING);