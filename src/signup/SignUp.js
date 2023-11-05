import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Config from "../config/Config";
// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: ["Amaranth", "sans-serif"].join(","),
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SRA_userData"));
    if (user) {
      const token = user.token;
      if (
        token &&
        Math.floor(Date.now() / 1000) <
          JSON.parse(atob(token.split(".")[1])).exp
      ) {
        if (user.role === "customer") {
          navigate("/menu");
        } else {
          navigate("/orders");
        }
      }
    }
  }, []);
  async function handlePost(newUser) {
    try {
      console.log("post user" + newUser);
      const { data } = await axios.post(
        `${Config.API_BASE_URL}users/signup`,
        newUser
      );
      console.log("post data" + data);
      if (data) {
        toast.success(`OTP sent to ${data.email}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("SRA_userData", JSON.stringify(data));
      }
      navigate("/verify-otp");
    } catch (err) {
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
    console.log("submit data" + data);
    const passwordsMatch =
      data.get("password") === data.get("confirm-password");
    if (!passwordsMatch) {
      toast.warn("passwords do not match", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let newUser = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        role: "customer",
      };
      console.log(newUser);
      handlePost(newUser);
    }
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
          <img
            src="cartoon.png"
            style={{ height: 90, width: 90 }}
            alt="not found"
          ></img>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  inputProps={{ minLength: 8 }}
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
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
