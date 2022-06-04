import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { AppDispatch, RootState } from "../../store";
import mediaService from "./mediaService";

export const getMediaList = createAsyncThunk(
  "media/getMediaList",
  async (data, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.AuthorizationToken.Token;
      return await mediaService.getMediaList(data, token);
    } catch (error: any) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
