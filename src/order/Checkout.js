import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import Animation from "../Animation";
import GetReq from "../GetReq";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Config from "../config/Config";
const Checkout = () => {
  const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  useEffect(() => {
    GetReq(
      `${Config.API_BASE_URL}orders?status=order_is_ready&user=${user._id}`,
      setIsLoading
    )
      .then((res) => {
        setOrders(res);
        console.log(res);
        let temp = 0;
        res.map((x) => (temp += x.totalAmount));
        setTotal(Math.round(temp));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_VylqLIJ6YATo71",
      amount: 500, // change to totalAmount in production
      currency: data.currency,
      name: "Smart Restaurant App",
      description: "Smart Restaurant App checkout",
      order_id: data.id,
      handler: async function (response) {
        try {
          console.log("handler", response);
          const verifyURL = `${Config.API_BASE_URL}payment/verify`;
          const { data } = await Axios.post(verifyURL, response, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          navigate("/menu");
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const paymentURL = `${Config.API_BASE_URL}payment/orders`;
      const { data } = await Axios.post(
        paymentURL,
        {
          amount: 500,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sfsf", data);

      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Animation />}
      <Typography variant="h4">Checkout</Typography>
      {orders.length !== 0 && (
        <Button
          onClick={handlePayment}
          variant="contained"
          style={{ backgroundColor: "green", color: "white" }}
        >
          PAY&nbsp; <span>&#8377;</span>
          {total}
        </Button>
      )}
      {orders.map((order) => (
        <Box
          key={order._id}
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
          <Box
            sx={{ flex: { xs: "1", sm: "1", md: "1", lg: "1.3", xl: "1.3" } }}
          >
            <Typography>
              <b>Status: Order Ready</b>
            </Typography>
            <Typography variant="subtitle1">
              Table: {order.tableNumber}
            </Typography>
            <Typography variant="subtitle1">
              Total: <span>&#8377;</span> {order.totalAmount}
            </Typography>
          </Box>
          <Box
            sx={{ flex: { xs: "1", sm: "1", md: "1", lg: "1.3", xl: "1.3" } }}
          >
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
      ))}
    </div>
  );
};

export default Checkout;
