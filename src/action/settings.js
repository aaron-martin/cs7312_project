import {createAction} from "@reduxjs/toolkit";
import {
    CLOSE_ADD_LOCATION_MODAL,
    OPEN_ADD_LOCATION_MODAL,
    TOGGLE_PANEL_VIEW,
    UPDATE_FLOOR_PLAN_DAY_TIMNE
} from "./actionTypes.js";

export const openAddLocationModal= createAction(OPEN_ADD_LOCATION_MODAL)
export const closeAddLocationModal= createAction(CLOSE_ADD_LOCATION_MODAL)
export const togglePanelView= createAction(TOGGLE_PANEL_VIEW)
export const updateFloorPlanDayTime= createAction(UPDATE_FLOOR_PLAN_DAY_TIMNE)