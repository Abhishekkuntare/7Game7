import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { rollDice } from "../store/gameSlice";

const BettingPage = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.user.points);
  const diceResult = useSelector((state) => state.game.diceResult);
  const message = useSelector((state) => state.game.message);
  const loading = useSelector((state) => state.game.loading);
  const token = useSelector((state) => state.user.token);

  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState("7up");

  const handleRollDice = () => {
    dispatch(rollDice(betAmount, betType, token));
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        7 Up 7 Down
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Points: {points}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Bet Amount</InputLabel>
            <Select
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            >
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Bet Type</InputLabel>
            <Select
              value={betType}
              onChange={(e) => setBetType(e.target.value)}
            >
              <MenuItem value={"7up"}>7 Up</MenuItem>
              <MenuItem value={"7"}>Lucky 7</MenuItem>
              <MenuItem value={"7down"}>7 Down</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRollDice}
            disabled={loading}
          >
            Roll Dice
          </Button>
        </Grid>
        {loading && (
          <Grid item xs={12} align="center">
            <CircularProgress />
          </Grid>
        )}
        {diceResult !== null && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Dice Result: {diceResult}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                {message}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default BettingPage;
