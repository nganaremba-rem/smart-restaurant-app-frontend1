import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UnauthorizedPage from "./UnautorizedPage";
import ViewCart from "./cart/ViewCart";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UnProtectedRoutes from "./components/UnProtectedRoutes";
import { CartProvider } from "./context/Cart";
import useSocket from "./hooks/useSocket";
import MenuList from "./menu/MenuList";
import Checkout from "./order/Checkout";
import PastOrders from "./order/PastOrders";
import ViewOrders from "./order/ViewOrders";
import NotFound from "./pages/NotFound";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import VerifyOTP from "./signup/VerifyOTP";

function App() {
	useSocket();

	return (
		<>
			<Router>
				<Routes>
					<Route element={<UnProtectedRoutes />}>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
					</Route>
					<Route element={<ProtectedRoutes />}>
						{/* <Route path="/" element={<SignIn />} /> */}
						<Route
							path="/"
							element={
								<CartProvider>
									<MenuList />
								</CartProvider>
							}
						/>
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/verify-otp" element={<VerifyOTP />} />
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
					</Route>
					<Route path="/unauthorized" element={<UnauthorizedPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>

			<ToastContainer
				position="bottom-right"
				autoClose={4000}
				hideProgressBar={false}
				closeOnClick={true}
				progress={undefined}
				theme="light"
			/>
		</>
	);
}

export default App;
