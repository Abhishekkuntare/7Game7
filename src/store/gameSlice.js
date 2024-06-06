import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setPoints } from "./userSlice";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    diceResult: null,
    message: "",
    loading: false,
  },
  reducers: {
    setDiceResult: (state, action) => {
      state.diceResult = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setDiceResult, setMessage, setLoading } = gameSlice.actions;

export const rollDice = (betAmount, betType, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      "https://7-game7-backend.vercel.app/api/roll",
      { betAmount, betType },
      {
        headers: { Authorization: token },
      }
    );
    const { diceTotal, newPoints, resultMessage } = response.data;
    dispatch(setDiceResult(diceTotal));
    dispatch(setMessage(resultMessage));
    dispatch(setPoints(newPoints));
  } catch (error) {
    console.error("Error rolling dice", error);
  }
  dispatch(setLoading(false));
};

export default gameSlice.reducer;
