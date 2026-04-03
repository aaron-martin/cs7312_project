import {createAction} from "@reduxjs/toolkit";
import {CLOSE_ADD_LOCATION_MODAL, OPEN_ADD_LOCATION_MODAL} from "./actionTypes.js";

export const openAddLocationModal= createAction(OPEN_ADD_LOCATION_MODAL)
export const closeAddLocationModal= createAction(CLOSE_ADD_LOCATION_MODAL)