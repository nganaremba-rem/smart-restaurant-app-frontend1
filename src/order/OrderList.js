import React from "react";
import DeleteReq from "../DeleteReq";
import Axios from "axios";
import SingleOrder from "./SingleOrder";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { SocketContext } from "../context/socket";
import Config from "../config/Config";
const OrderList = ({ orders, role, setOrders }) => {
  // Add conditional rendering based on role
  const socket = React.useContext(SocketContext);
  const deleteOrder = async (orderId) => {
    try {
      await DeleteReq(`${Config.API_BASE_URL}orders/${orderId}`);
      const arr = orders.filter((x) => x._id !== orderId);
      setOrders(arr);
      toast.success("Order cancelled successfully", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const updateOrder = async (orderId, body) => {
    try {
      const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
      await Axios.patch(`${Config.API_BASE_URL}orders/${orderId}`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (body.status === "confirmed_by_waiter") {
        socket.emit("order_confirmed", {
          customer: `${body.user}`,
          tableNumber: `${body.tableNumber}`,
        });
        toast.success("Order confirmed", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (body.status === "confirmed_by_chef") {
        socket.emit("preparation_started", {
          customer: `${body.user}`,
        });
        toast.success("You started preparation", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (body.status === "order_is_ready") {
        socket.emit("order_is_ready", {
          customer: `${body.user}`,
          waiter: `${body.waiter}`,
          tableNumber: `${body.tableNumber}`,
        });
        toast.success("Order is ready.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
      window.location.reload();
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <Typography variant="h4">Orders:</Typography>
      {orders.map((order) => (
        <SingleOrder
          key={order._id}
          order={order}
          role={role}
          updateOrder={updateOrder}
          setOrders={setOrders}
          deleteOrder={deleteOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;
