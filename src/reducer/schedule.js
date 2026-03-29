import {
    SCHEDULE_MEETING,
    RESCHEDULE_MEETING,
    DELETE_SCHEDULE_MEETING
} from "../action/actionTypes.js";

const initialState = [];

function schedule(state = initialState, action) {
    switch (action.type) {
        case SCHEDULE_MEETING:
            return [
                ...state,
                {
                    ...action.payload
                }
            ];
        case RESCHEDULE_MEETING:
            return state.reduce((acc, entry) => {
                if (entry.id === action.payload.scheduleId) {
                    acc.push({
                        ...entry,
                        time: action.payload.time,
                        day: action.payload.day
                    });
                } else {
                    acc.push(entry);
                }
                return acc;
            }, [])
        case DELETE_SCHEDULE_MEETING:
            return state.filter((entry) => (entry.id !== action.payload))
        default:
            return state;
    }
}

export default schedule;
