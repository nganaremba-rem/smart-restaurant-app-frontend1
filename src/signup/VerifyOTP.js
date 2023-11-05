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
import { Link } from "@mui/material";
import { SocketContext } from "../context/socket";
import Config from "../config/Config";
// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export default function VerifyOTP() {
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
  const socket = React.useContext(SocketContext);
  async function handleResend() {
    const newUser = JSON.parse(localStorage.getItem("SRA_userData"));
    try {
      const { data } = await axios.post(
        `${Config.API_BASE_URL}users/signup`,
        newUser
      );

      toast.success(`OTP sent to ${data.email}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      if (data) {
        localStorage.setItem("SRA_userData", JSON.stringify(data));
      }
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

  async function handlePost(postdata) {
    console.log(postdata);
    try {
      const { data } = await axios.post(
        `${Config.API_BASE_URL}users/verify-otp`,
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
        socket.emit("join_customer_room", {
          customer: data._id,
        });
        navigate("/menu");
      } else {
        if (data.role === "chef") {
          socket.emit("join_chefs_room", { chef: `${data._id}` });
        }
        if (data.role === "waiter") {
          socket.emit("join_waiters_room", { waiter: `${data._id}` });
        }
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
            <Grid item>
              <Link
                variant="body2"
                onClick={handleResend}
                style={{ cursor: "pointer" }}
              >
                Resend OTP
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
