import { createStore, combineReducers } from "redux";
import meetings from "./meetings";
import schedule from "./schedule";
import rooms from "./rooms";
import settings from "./settings.js";

const rootReducer = combineReducers({
    meetings,
    rooms,
    settings,
    schedule
});
const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

export default store;