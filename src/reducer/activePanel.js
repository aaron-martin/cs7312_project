import {TOGGLE_PANEL_VIEW} from "../action/actionTypes.js";

export const PLANNER_PANEL = 'planner';
export const FLOOR_PLAN_PANEL = 'floorPlan';

function activePanel(state = PLANNER_PANEL, action) {
    switch (action.type) {
        case TOGGLE_PANEL_VIEW:
            return action.payload;
        default:
            return state
    }
}

export default activePanel;