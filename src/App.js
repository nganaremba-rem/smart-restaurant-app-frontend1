import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UnauthorizedPage from "./UnautorizedPage";
import ViewCart from "./cart/ViewCart";
import { CartProvider } from "./context/Cart";
import { SocketContext } from "./context/socket";
import { socket } from "./context/socket";
import MenuList from "./menu/MenuList";
import Checkout from "./order/Checkout";
import PastOrders from "./order/PastOrders";
import ViewOrders from "./order/ViewOrders";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import VerifyOTP from "./signup/VerifyOTP";

function App() {
	// const socket = useContext(SocketContext);
	const user = JSON.parse(localStorage.getItem("SRA_userData"));
	let role = "";
	if (user) {
		role = user.role;
	}
	useEffect(() => {
		socket.on("pick_order", (data) => {
			console.log("pick_order");
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("chef_ended", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("waiter_confirmed", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("chef_started", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});

		if (role === "waiter") {
			socket.emit("join_waiters_room", { waiter: `${user._id}` });
		}
		if (role === "chef") {
			socket.emit("join_chefs_room", { chef: `${user._id}` });
		}
		if (role === "customer") {
			socket.emit("join_customer_room", {
				customer: user._id,
			});
		}
	}, [socket, role, user]);
	return (
		<>
			<Router>
				<Routes>
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/verify-otp" element={<VerifyOTP />} />
					<Route
						path="/menu"
						element={
							<CartProvider>
								<MenuList />
							</CartProvider>
						}
					/>
					<Route
						path="/cart"
						element={
							<CartProvider>
								<ViewCart />
							</CartProvider>
						}
					/>
					<Route
						path="/orders"
						element={
							<CartProvider>
								<ViewOrders />
							</CartProvider>
						}
					/>
					<Route path="/past-orders" element={<PastOrders />} />
					<Route path="/unauthorized" element={<UnauthorizedPage />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
