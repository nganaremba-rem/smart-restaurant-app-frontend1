import React, { useEffect, useState } from "react";
import GetReq from "../GetReq";
import OrderList from "./OrderList";
import PrimarySearchAppBar from "../appbar/PrimarySearchAppBar.js";
import { Box } from "@mui/material";
import Animation from "../Animation";
import Config from "../config/Config.js";
function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  useEffect(() => {
    let apiURL = `${Config.API_BASE_URL}orders?`;
    if (role === "customer") {
      apiURL += `sort=-createdAt&user=${user._id}&status=payment_done`;
    }
    GetReq(apiURL, setIsLoading)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      ></Box>
      <OrderList
        orders={orders}
        role={role}
        setOrders={setOrders}
        page="past-orders"
      />
    </div>
  );
}

export default PastOrders;
