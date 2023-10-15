import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BrowseMenu({ cuisines }) {
  console.log(cuisines);
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
        variant="contained"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "#608cd4",
          color: "white",
          position: "fixed",
          top: "5.5em",
          right: "20px",
          zIndex: 100,
        }}
      >
        Browse Menu
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ height: "50%", position: "fixed", top: "20px" }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Menu{" "}
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
          <div>
            <ul
              style={{
                color: "#513935",
              }}
            >
              {cuisines.map((cuisine, index) => (
                <li key={index}>
                  <a
                    href={"#" + cuisine.cuisine}
                    onClick={handleClose}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "#513935",
                    }}
                  >
                    <p>
                      {cuisine.cuisine}
                      {" (  "}
                      {cuisine.count}
                      {"  ) "}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
