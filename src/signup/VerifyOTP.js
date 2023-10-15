import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export default function VerifyOTP({ socket, room }) {
  const navigate = useNavigate();
  async function handlePost(postdata) {
    console.log(postdata);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/verify-otp",
        postdata
      );

      toast.success("OTP verification successfull", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("SRA_userData", JSON.stringify(data));
      if (data.role === "customer") {
        navigate("/menu");
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(JSON.parse(localStorage.getItem("SRA_userData")).email);
    let postdata = {
      email: JSON.parse(localStorage.getItem("SRA_userData")).email,
      enteredOTP: data.get("code"),
    };
    handlePost(postdata);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="roll.png" style={{ height: 100, width: 100 }}></img>
          <Typography component="h1" variant="h5">
            Enter OTP
          </Typography>
          <Typography component="p">
            We've sent an OTP to your email.
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="code"
                  required
                  fullWidth
                  id="code"
                  label="One time password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: "#ff841c", color: "white" }}
            >
              Verify OTP
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}