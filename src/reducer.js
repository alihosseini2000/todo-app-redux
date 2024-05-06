import { combineReducers } from "redux";
import todoReducer from "./features/todos/todoSlice";
import filterReducer from "./features/filter/filtersSlice";
const rootReducer = combineReducers({
    todos: todoReducer ,
    filters: filterReducer
})

export default rootReducer