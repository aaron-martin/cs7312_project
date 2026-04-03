import {UPDATE_MEETING_LOCATION, OPEN_ADD_LOCATION_MODAL, CLOSE_ADD_LOCATION_MODAL} from "../action/actionTypes.js";

function addLocationModalSetting(state, action) {
    switch (action.type) {
        case OPEN_ADD_LOCATION_MODAL:
            return action.payload;
        case UPDATE_MEETING_LOCATION:
            return null;
        case CLOSE_ADD_LOCATION_MODAL:
            return null;
        default:
            return null
    }
}

export default addLocationModalSetting;