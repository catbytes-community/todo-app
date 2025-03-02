import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import tasksReducer from "./slices/tasksSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
  },
});
