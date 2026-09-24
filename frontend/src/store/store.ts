import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice.ts";
import authReducer from "./slices/authSlice.ts";
import popUpReducer from "./slices/popUpSlice.ts";
export const store = configureStore({
  reducer: { tasks: taskReducer, auth: authReducer, popup: popUpReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
