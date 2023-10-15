import React from "react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import Modal from "./Modal";
import { CartContext } from "../context/Cart";
import { Button } from "@mui/material";
function PlaceOrderButton({ socket, room }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);

  const handleConfirmOrder = () => {
    // Sending create order request to the server
    const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
    const menuItems = cartItems.map((obj) => ({
      menuName: obj._id,
      quantity: obj.quantity,
    }));

    Axios.post(
      "http://localhost:8000/api/v1/orders/",
      {
        user: localStorage.getItem("SRA_userData")._id,
        menuItems,
        totalAmount: getCartTotal(),
        tableNumber: Math.floor(Math.random() * 10),
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        socket.emit("order_placed", {
          tableNumber: 1,
        });
        toast.success("Order placed successfully", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      })
      .then(() => {
        clearCart();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
        style={{
          color: "#ff841c",
          borderColor: "#ff841c",
          backgroundColor: "transparent",
        }}
      >
        Place Order
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
}

export default PlaceOrderButton;
