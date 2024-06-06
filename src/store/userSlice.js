import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    points: 5000,
    token: null,
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setPoints, setToken } = userSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://7-game7-backend.vercel.app/api/login",
      {
        username,
        password,
      }
    );
    dispatch(setToken(response.data.token));
  } catch (error) {
    console.error("Error logging in", error);
  }
};

export const registerUser = (username, password) => async () => {
  try {
    await axios.post("https://7-game7-backend.vercel.app/api/register", {
      username,
      password,
    });
  } catch (error) {
    console.error("Error registering", error);
  }
};

export default userSlice.reducer;
