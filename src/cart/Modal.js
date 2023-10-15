import React from "react";
import "./Modal.css";
import { Button, Typography } from "@mui/material";

const Modal = ({ isOpen, onClose, onConfirmOrder }) => {
  const closeModal = () => {
    onClose();
  };

  const handleConfirmOrder = () => {
    onConfirmOrder();
    closeModal();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <Typography variant="h5" marginBottom="10px">
          Confirm Order
        </Typography>
        <Typography>Are you sure you want to confirm this order?</Typography>
        <Button
          onClick={handleConfirmOrder}
          variant="contained"
          style={{
            marginTop: "20px",
            color: "#ffffff",
            backgroundColor: "#ff841c",
          }}
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
};

export default Modal;
