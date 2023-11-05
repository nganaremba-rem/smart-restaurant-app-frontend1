import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import VerifyOTP from "./signup/VerifyOTP";
import { CartProvider } from "./context/Cart";
import MenuList from "./menu/MenuList";
import ViewCart from "./cart/ViewCart";
import ViewOrders from "./order/ViewOrders";
import Checkout from "./order/Checkout";
import PastOrders from "./order/PastOrders";
import UnauthorizedPage from "./UnautorizedPage";
import { SocketContext } from "./context/socket";

function App() {
  const socket = useContext(SocketContext);
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
  }, [socket]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/verify-otp" element={<VerifyOTP />}></Route>
          <Route
            path="/menu"
            element={
              <CartProvider>
                <MenuList />
              </CartProvider>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <CartProvider>
                <ViewCart />
              </CartProvider>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <CartProvider>
                <ViewOrders />
              </CartProvider>
            }
          ></Route>
          <Route path="/past-orders" element={<PastOrders />}></Route>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
