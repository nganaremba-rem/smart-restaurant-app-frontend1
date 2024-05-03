// @ts-check

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Config from "../config/Config";
import { SocketContext } from "../context/socket";
import useAuth from "../hooks/useAuth";
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
export default function SignIn() {
	const { login } = useAuth();
	// const navigate = useNavigate();
	// const socket = React.useContext(SocketContext);
	// React.useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem("SRA_userData"));
	// 	if (user) {
	// 		const token = user.token;
	// 		if (
	// 			token &&
	// 			Math.floor(Date.now() / 1000) <
	// 				JSON.parse(atob(token.split(".")[1])).exp
	// 		) {
	// 			if (user.role === "customer") {
	// 				navigate("/menu");
	// 			} else {
	// 				navigate("/orders");
	// 			}
	// 		}
	// 	}
	// }, []);

	// async function handlePost(user) {
	// 	try {
	// 		const { data } = await axios.post(
	// 			`${Config.API_BASE_URL}users/signin`,
	// 			user,
	// 		);
	// 		if (data) {
	// 			toast.success("logged in successfully", {
	// 				position: "bottom-right",
	// 				autoClose: 4000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				progress: undefined,
	// 				theme: "light",
	// 			});
	// 			localStorage.setItem("SRA_userData", JSON.stringify(data));
	// 		}
	// 		if (data.role === "customer") {
	// 			socket.emit("join_customer_room", {
	// 				customer: data._id,
	// 			});
	// 			navigate("/menu");
	// 		} else {
	// 			if (data.role === "chef") {
	// 				socket.emit("join_chefs_room", { chef: `${data._id}` });
	// 			}
	// 			if (data.role === "waiter") {
	// 				socket.emit("join_waiters_room", { waiter: `${data._id}` });
	// 			}
	// 			navigate("/orders");
	// 		}
	// 	} catch (err) {
	// 		toast.error(`${err.response.data.message}`, {
	// 			position: "bottom-right",
	// 			autoClose: 3000,
	// 			hideProgressBar: false,
	// 			closeOnClick: true,
	// 			progress: undefined,
	// 			theme: "light",
	// 		});
	// 	}
	// }

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = {
			email: data.get("email"),
			password: data.get("password"),
		};
		login(user);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
					<img
						src="cartoon.png"
						style={{ height: 90, width: 90 }}
						alt="cartoon.png"
					/>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							type="email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							style={{ backgroundColor: "#ff841c", color: "white" }}
						>
							Sign In
						</Button>
						<Grid container justifyContent="center">
							{/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
