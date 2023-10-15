import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
export default function UpdateOrderDialog({ deleteOrder, orderID }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteOrder(orderID);
    handleClose();
  };
  return (
    <div style={{ display: "inline-block" }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "transparent",
          color: "#007aff",
        }}
        disableElevation
      >
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          Cancel Order
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
