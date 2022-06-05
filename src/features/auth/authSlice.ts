import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { User } from "../../types/user";
import { Device } from "../../types/device";
import { v4 as uuidv4 } from "uuid";

// Get user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};
const user = getCurrentUser();

interface State {
  user?: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isAnon: boolean;
  message: string;
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAnon: user ? user.User.UserName === "Anonymous" : false,
  message: "",
};

// Anonymous user
export const anonUser = createAsyncThunk(
  "auth/anonUser",
  async (_, thunkAPI) => {
    try {
      return await authService.anonUser(uuidv4(), "WEB");
    } catch (error: any) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      state.isAnon = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(anonUser.pending, (state: State) => {
        state.isLoading = true;
      })
      .addCase(anonUser.fulfilled, (state: State, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAnon = true;
        state.user = action.payload;
      })
      .addCase(anonUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state: State) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: State, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAnon = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
