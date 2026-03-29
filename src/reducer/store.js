import { createStore, combineReducers } from "redux";
import meetings from "./meetings";
import schedule from "./schedule";

const rootReducer = combineReducers({
    meetings,
    schedule
});
const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

export default store;