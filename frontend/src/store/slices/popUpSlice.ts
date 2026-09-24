import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
  name: "popup",
  initialState: {
    addTaskPopUp: false,
    updateTaskPopUp: false,
  },
  reducers: {
    toggleAddTaskPopUp(state) {
      state.addTaskPopUp = !state.addTaskPopUp;
    },
    toggleUpdateTaskPopUp(state) {
      state.updateTaskPopUp = !state.updateTaskPopUp;
    },
  },
});

export const { toggleAddTaskPopUp, toggleUpdateTaskPopUp } = popUpSlice.actions;

export default popUpSlice.reducer;
