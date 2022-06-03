import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { User } from "../../types/user";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

// Get user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};
const user = getCurrentUser();

interface State {
  user?: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as State;

//Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {
    try {
      return await authService.login(user.username, user.password);
    } catch (error: any) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: State) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: State) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: State, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
