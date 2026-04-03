import {UPDATE_FLOOR_PLAN_DAY_TIMNE} from "../action/actionTypes.js";
import {TIME_SLOTS} from "../literals.js";

const initialState = {
    day: 'Monday',
    time: TIME_SLOTS[0]
}

function floorPlanDayTime(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FLOOR_PLAN_DAY_TIMNE:
            return action.payload;
        default:
            return state
    }
}

export default floorPlanDayTime;