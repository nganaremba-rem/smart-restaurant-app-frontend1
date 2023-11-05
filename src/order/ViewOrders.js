import React, { useEffect, useState } from "react";
import GetReq from "../GetReq";
import OrderList from "./OrderList";
import PrimarySearchAppBar from "../appbar/PrimarySearchAppBar.js";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import Animation from "../Animation";
import Config from "../config/Config.js";
function ViewOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  React.useEffect(() => {
    if (!user) {
      navigate("/unauthorized");
    } else {
      const token = user.token;
      if (!token) {
        // If the token is not present, redirect to Signin page
        navigate("/unauthorized");
      } else {
        // Parse the token to get the expiration timestamp
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > exp) {
          // If the token is expired, redirect to Signin page
          navigate("/unauthorized");
        }
      }
    }
  }, []);

  useEffect(() => {
    let apiURL = `${Config.API_BASE_URL}orders?`;
    // console.log(JSON.parse(localStorage.getItem("SRA_userData")).token);
    apiURL += state.length > 0 ? `status=${state}&` : "";
    //  "waiter", "chef", "manager", "admin", "owner"
    if (role === "customer") {
      apiURL += `sort=-createdAt&user=${user._id}&status[ne]=payment_done`;
      // if (state.length === 0) apiURL += "status=pending";
    } else if (role === "waiter") {
      apiURL += "sort=createdAt&";
      if (state.length === 0) apiURL += "status=pending&";
      else if (state !== "pending") apiURL += `waiter=${user._id}&`; // Only the waiter who confirmerd the order can see that
    } else if (role === "chef") {
      apiURL += "sort=createdAt&";
      if (state.length === 0) {
        setState("confirmed_by_waiter");
        apiURL += `status=confirmed_by_waiter`;
      }
      if (state !== "confirmed_by_waiter" && state !== "pending") {
        apiURL += `chef=${user._id}&`;
      }
    }
    GetReq(apiURL, setIsLoading)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(apiURL);
  }, [state]);
  return (
    <div className="main-div-order">
      <PrimarySearchAppBar role={role} />
      {isLoading && <Animation />}
      <Box
        style={{
          marginTop: "4.5em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {role !== "customer" && <DropDown setState={setState} state={state} />}
        {role === "customer" && (
          <Button
            variant="contained"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        )}
      </Box>
      <OrderList orders={orders} role={role} setOrders={setOrders} />
    </div>
  );
}

export default ViewOrders;
