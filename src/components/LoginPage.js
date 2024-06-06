import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";
import { loginUser, registerUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      await dispatch(loginUser(username, password));
    } else {
      await dispatch(registerUser(username, password));
    }
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAuth}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        <Button
          fullWidth
          color="secondary"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need to register? Sign Up" : "Have an account? Login"}
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
