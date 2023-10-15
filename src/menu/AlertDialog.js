import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DialogTitle, MenuItem } from "@mui/material";
export default function AlertDialog({ imageURL, description, calories }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{
          color: "gray",
          borderRadius: 20,
          borderColor: "gray",
          textTransform: "none",
          height: 25,
          marginTop: 5,
        }}
        sx={{ display: { xl: "none" } }}
        onClick={handleClickOpen}
      >
        More Details <ArrowForwardIosIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backdropFilter: "blur(2px) sepia(2%)",
          // 👇 Another option to style Paper
          "& .MuiDialog-paper": {
            borderRadius: "40px",
          },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <img src={imageURL} style={{ height: "100%", width: "100%" }}></img>
        </DialogTitle>
        <DialogContent sx={{ justifyItems: "center" }}>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>Calories: {calories}</b>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
