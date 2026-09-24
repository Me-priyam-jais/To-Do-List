import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../../types/task";
import { API_URL, getErrorMessage } from "../api";
import type { AppDispatch } from "../store";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    loading: false,
    error: null,
    message: null,
    tasks: [] as Task[],
  },
  reducers: {
    fetchAllTasksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchAllTasksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    fetchTasksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addTaskRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addTaskFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateTaskFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTaskStatusRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    toggleTaskStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    toggleTaskStatusFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTaskFailed(state, aciton) {
      state.loading = false;
      state.error = aciton.payload;
    },
    clearCompletedTasksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    clearCompletedTasksSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    clearCompletedTaskFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetTaskSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.tasks = state.tasks;
    },
    makeTasksEmpty(state){
      state.loading = false;
      state.error = null;
      state.message = null;
      state.tasks = [];
    }
  },
});

export const resetTaskSlice = () => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.resetTaskSlice());
};
export const makeTasksEmpty = () => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.makeTasksEmpty());
}
export const fetchAllTasks = () => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.fetchAllTasksRequest());
  await axios
    .get(`${API_URL}/task/user/tasks`, { withCredentials: true })
    .then((res) => {
      dispatch(taskSlice.actions.fetchAllTasksSuccess(res.data.tasks));
    })
    .catch((err) => {
      dispatch(
        taskSlice.actions.fetchAllTasksFailed(getErrorMessage(err)),
      );
    });
};
export const addTask = (data: Partial<Task>) => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.addTaskRequest());
  try {
    const res = await axios.post(`${API_URL}/task/add`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(taskSlice.actions.addTaskSuccess(res.data.message));
    return true;
  } catch (error) {
    dispatch(taskSlice.actions.addTaskFailed(getErrorMessage(error)));
    return false;
  }
};

export const updateTask =
  (data: Partial<Task>, taskID: string) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.updateTaskRequest());
    try {
      const res = await axios.put(`${API_URL}/task/update/${taskID}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(taskSlice.actions.updateTaskSuccess(res.data.message));
      return true;
    } catch (error) {
      dispatch(taskSlice.actions.updateTaskFailed(getErrorMessage(error)));
      return false;
    }
  };

export const deleteTask = (taskID: string) => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.deleteTaskRequest());
  await axios
    .delete(`${API_URL}/task/delete/${taskID}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(taskSlice.actions.deleteTaskSuccess(res.data.message));
    })
    .catch((err) => [
      dispatch(
        taskSlice.actions.deleteTaskFailed(
          getErrorMessage(err),
        ),
      ),
    ]);
};
export const toggleTaskStatus = (taskID: string) => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.toggleTaskStatusRequest());
  await axios
    .put(`${API_URL}/task/toggle/status/${taskID}`, undefined, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(taskSlice.actions.toggleTaskStatusSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(
        taskSlice.actions.toggleTaskStatusFailed(
          getErrorMessage(err),
        ),
      );
    });
};
export const clearCompletedTasks = () => async (dispatch: AppDispatch) => {
  dispatch(taskSlice.actions.clearCompletedTasksRequest());
  await axios
    .delete(`${API_URL}/task/clear/completed`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(taskSlice.actions.clearCompletedTasksSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(
        taskSlice.actions.clearCompletedTaskFailed(
          getErrorMessage(err),
        ),
      );
    });
};
export default taskSlice.reducer;
