import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import VerifyOTP from "./signup/VerifyOTP";
import { CartProvider } from "./context/Cart";
import MenuList from "./menu/MenuList";
import ViewCart from "./cart/ViewCart";
import ViewOrders from "./order/ViewOrders";
import Checkout from "./order/Checkout";
import PastOrders from "./order/PastOrders";
function App() {
  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  const socket = io.connect("http://localhost:8000", {
    transports: ["websocket"],
  });
  const [room, setRoom] = useState(""); // Never used further

  useEffect(() => {
    if (role === "waiter") {
      socket.emit("join_waiters_room", { waiter: `${user._id}` });
      socket.on("pick_order", (data) => {
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
    }
    if (role === "chef") {
      socket.emit("join_chefs_room", { chef: `${user._id}` });
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
    }
    if (role === "customer") {
      socket.emit("join_customer_room", {
        customer: user._id,
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
    }
  }, [socket]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/signin"
            element={<SignIn socket={socket} room={room} />}
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/verify-otp"
            element={<VerifyOTP socket={socket} room={room} />}
          ></Route>
          <Route
            path="/menu"
            element={
              <CartProvider>
                <MenuList socket={socket} room={room} />
              </CartProvider>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <CartProvider>
                <ViewCart socket={socket} room={room} />
              </CartProvider>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <CartProvider>
                <ViewOrders socket={socket} room={room} />
              </CartProvider>
            }
          ></Route>
          <Route
            path="/past-orders"
            element={<PastOrders socket={socket} room={room} />}
          ></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
