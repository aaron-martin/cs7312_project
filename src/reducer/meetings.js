import {CREATE_MEETING} from "../action/actionTypes.js";

const initialState = [
    {id: '1', name: 'Meeting 1', description: 'meeting one', duration: 60, numAttendees: 50},
    {id: '2', name: 'Meeting 2', description: 'meeting two', duration: 60, numAttendees: 50},
];

function meetings(state = initialState, action) {
    switch (action.type) {
        case CREATE_MEETING:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default meetings;
