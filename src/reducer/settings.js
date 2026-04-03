import { combineReducers } from "redux";
import addLocationModalSetting from "./addLocationModalSetting.js";
import activePanel from "./activePanel.js";
import floorPlanDayTime from "./floorPlanDayTime.js";

const settings = combineReducers({
    addLocationModalSetting,
    activePanel,
    floorPlanDayTime
});

export default settings;