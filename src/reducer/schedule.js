import {
    SCHEDULE_MEETING,
    RESCHEDULE_MEETING,
    DELETE_SCHEDULE_MEETING, UPDATE_MEETING_LOCATION
} from "../action/actionTypes.js";

const initialState = {
    items: [],
    prevItems: [],
};

function schedule(state = initialState, action) {
    switch (action.type) {
        case SCHEDULE_MEETING:
            return {
               prevItems: [
                   state.items.map((item) => ({...item})),
                   ...state.prevItems
               ],
               items: [
                    ...state.items,
                    {
                        ...action.payload
                    }
                ]
            };
        case RESCHEDULE_MEETING:
            return {
                prevItems: [
                    state.items.map((item) => ({...item})),
                    ...state.prevItems
                ],
                items: state.items.reduce((acc, entry) => {
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
            }
        case UPDATE_MEETING_LOCATION:
            return {
                prevItems: [
                    state.items.map((item) => ({...item})),
                    ...state.prevItems
                ],
                items: state.items.reduce((acc, entry) => {
                    if (entry.id === action.payload.scheduleId) {
                        acc.push({
                            ...entry,
                            roomId: action.payload.roomId
                        });
                    } else {
                        acc.push(entry);
                    }
                    return acc;
                }, [])
            }
        case DELETE_SCHEDULE_MEETING:
            return {
                prevItems: [
                    state.items.map((item) => ({...item})),
                    ...state.prevItems
                ],
                items: state.items.filter((entry) => (entry.id !== action.payload))
            }
        default:
            return state;
    }
}

export default schedule;
