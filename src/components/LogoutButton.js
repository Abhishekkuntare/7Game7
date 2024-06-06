import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../store/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
