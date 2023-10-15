import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DeleteOrderDialog from "./DeleteOrderDialog";
import UpdateOrderDialog from "./UpdateOrderDialog";
import RateOrderDialog from "./RateOrderDialog";

export default function SingleOrder({
  order,
  role,
  updateOrder,
  setOrders,
  deleteOrder,
  page,
}) {
  let colorOfb = "#29BB89";
  const date = new Date(order.createdAt);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTimeIST = date.toLocaleString("en-US", options);
  const state = order.status;
  if (state === "confirmed_by_waiter") {
    colorOfb = "#289672";
  } else if (state === "confirmed_by_chef") {
    colorOfb = "#1E6F5C";
  } else {
    colorOfb = "green";
  }
  return (
    <Box
      border="2px solid #d3d3d3"
      borderRadius="13px"
      sx={{
        width: { xs: "90%", sm: "90%", md: "80%", lg: "60%", xl: "60%" },
        marginLeft: { lg: "20%", xl: "20%", md: "10%" },
      }}
      display="flex"
      padding="15px"
      marginBottom="15px"
    >
      <Box sx={{ flex: { xs: "1", sm: "1", md: "1", lg: "1.3", xl: "1.3" } }}>
        <Typography color={colorOfb}>
          <b>
            Status:{" "}
            {(state === "" || state === "pending") && <b>Order Placed</b>}
            {state === "confirmed_by_waiter" && <b>Order Confirmed</b>}
            {state === "confirmed_by_chef" && <b>Order Preparing</b>}
            {state === "order_is_ready" && <b>Order Ready</b>}
            {state === "payment_done" && <b>Payment Received</b>}
          </b>
        </Typography>
        <Typography variant="subtitle1">Table: {order.tableNumber}</Typography>
        <Typography variant="subtitle1">
          Total: <span>&#8377;</span> {order.totalAmount}
        </Typography>
        <Typography variant="subtitle1">
          Created At: {formattedTimeIST}
        </Typography>
        {role === "waiter" && order.status === "pending" && (
          <Button
            style={{
              display: "block",
              borderColor: "#ff841c",
              color: "#ff841c",
              marginBottom: "7px",
            }}
            variant="outlined"
            onClick={() => {
              updateOrder(order._id, {
                status: "confirmed_by_waiter",
                user: order.user,
                tableNumber: order.tableNumber,
              });
            }}
          >
            confirm order
          </Button>
        )}
        {role === "chef" && order.status === "confirmed_by_waiter" && (
          <Button
            onClick={() =>
              updateOrder(order._id, {
                status: "confirmed_by_chef",
                user: order.user,
              })
            }
            style={{
              display: "block",
              borderColor: "#ff841c",
              color: "#ff841c",
              marginBottom: "7px",
            }}
          >
            start preparation
          </Button>
        )}
        {role === "chef" && order.status === "confirmed_by_chef" && (
          <Button
            onClick={() =>
              updateOrder(order._id, {
                status: "order_is_ready",
                user: order.user,
                waiter: order.waiter,
                tableNumber: order.tableNumber,
              })
            }
            style={{
              display: "block",
              borderColor: "#ff841c",
              color: "#ff841c",
              marginBottom: "7px",
            }}
          >
            Mark order as ready
          </Button>
        )}
        {((role === "customer" && order.status === "pending") ||
          (role === "waiter" &&
            (order.status === "pending" ||
              order.status === "confirmed_by_waiter")) ||
          (role === "chef" &&
            (order.status === "pending" ||
              order.status === "confirmed_by_waiter" ||
              order.status === "confirmed_by_chef"))) && (
          <>
            <DeleteOrderDialog deleteOrder={deleteOrder} orderID={order._id} />
            <UpdateOrderDialog deleteOrder={deleteOrder} orderID={order._id} />
          </>
        )}

        {role === "customer" &&
          order.status === "payment_done" &&
          !order.isRated && <RateOrderDialog order={order} />}
        {role === "customer" &&
          order.status === "payment_done" &&
          order.isRated && (
            <Typography color="#ff841c">Thanks for review</Typography>
          )}
      </Box>
      <Box sx={{ flex: { xs: "1", sm: "1", md: "1", lg: "1.3", xl: "1.3" } }}>
        {order.menuItems.map((item) => (
          <Typography
            key={item.menuName._id}
            display="inline-block"
            marginRight="10px"
          >
            &#9679;
            {item.menuName.name}
            {" x"}
            {item.quantity}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
