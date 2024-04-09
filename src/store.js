import { createStore } from "redux";
import handleUserReducer from "./redux/Reducer";

const store = createStore(handleUserReducer)

export default store