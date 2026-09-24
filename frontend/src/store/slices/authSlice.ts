import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ComponentState } from "react";
import { API_URL, getErrorMessage } from "../api";
import type { AppDispatch } from "../store";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  accountVerified: boolean;
  tasks: string[];
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    user: null as AuthUser | null,
  },
  reducers: {
    signUpRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    signUpSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    signUpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    OTPVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    OTPVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    OTPVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logOutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logOutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
      state.user = null;
    },
    logOutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, aciton) {
      state.loading = false;
      state.message = aciton.payload.message;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthSlice(state) {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
    },
  },
});
export const resetAuthSlice = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const signUp = (data: ComponentState) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.signUpRequest());
  await axios
    .post(`${API_URL}/auth/signup`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.signUpSuccess(res.data));
    })
    .catch((err) => {
      dispatch(authSlice.actions.signUpFailed(getErrorMessage(err)));
    });
};
export const OTPVerification =
  (email: string, OTP: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.OTPVerificationRequest());
    await axios
      .post(
        `${API_URL}/auth/verify-otp`,
        { email, OTP },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => {
        dispatch(authSlice.actions.OTPVerificationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(
          authSlice.actions.OTPVerificationFailed(getErrorMessage(err)),
        );
      });
  };

export const login = (data: ComponentState) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.loginRequest());
  await axios
    .post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(authSlice.actions.loginFailed(getErrorMessage(err)));
    });
};

export const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.logOutRequest());
  await axios
    .get(`${API_URL}/auth/logout`, { withCredentials: true })
    .then((res) => {
      dispatch(authSlice.actions.logOutSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(authSlice.actions.logOutFailed(getErrorMessage(err)));
    });
};
export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  await axios
    .post(
      `${API_URL}/auth/get`,
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch(() => {
      dispatch(authSlice.actions.getUserFailed());
    });
};
export const forgotPassword = (email: string) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios
    .put(
      `${API_URL}/auth/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        authSlice.actions.forgotPasswordFailed(getErrorMessage(err)),
      );
    });
};

export const resetPassword =
  (data: ComponentState, resetPasswordToken: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.resetPasswordRequest());
    await axios
      .put(
        `${API_URL}/auth/password/reset/${resetPasswordToken}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => {
        dispatch(authSlice.actions.resetPasswordSuccess(res.data));
      })
      .catch((err) => {
        dispatch(
          authSlice.actions.resetPasswordFailed(getErrorMessage(err)),
        );
      });
  };
export const updatePassword = (data: ComponentState) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  await axios
    .put(`${API_URL}/auth/password/update`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(
        authSlice.actions.updatePasswordFailed(getErrorMessage(err)),
      );
    });
};

export default authSlice.reducer;
