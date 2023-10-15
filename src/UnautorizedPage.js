import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sorry, You are not allowed to view this page</h1>
      <p>Please sign in to access this page.</p>
      <Button onClick={() => navigate("/signin")}>Sign In</Button>
    </div>
  );
};

export default UnauthorizedPage;
