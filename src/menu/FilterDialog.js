import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import UpperForm from "./UpperForm";
import { useState } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function FilterDialog({
  menuItems,
  sortedDishes,
  setSortedDishes,
  fixedDishes,
  veg,
  nonveg,
  setVeg,
  setNonveg,
  rating,
  priceUp,
  priceDown,
  setRating,
  setPriceDown,
  setPriceUp,
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const applyChanges = () => {};

  const handleApply = () => {
    applyChanges();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClearFilters = () => {
    setNonveg(false);
    setVeg(false);
    setPriceDown(0);
    setPriceUp(0);
    setRating(0);
    setSortedDishes(fixedDishes);
  };

  return (
    <div style={{ marginTop: "4.1em", paddingTop: "10px" }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "transparent",
          color: "gray",
          borderRadius: "20px",
          borderColor: "gray",
        }}
      >
        Filter <TuneIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Filter
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
          <UpperForm
            veg={veg}
            nonveg={nonveg}
            setVeg={setVeg}
            setNonveg={setNonveg}
            rating={rating}
            priceUp={priceUp}
            priceDown={priceDown}
            setRating={setRating}
            setPriceDown={setPriceDown}
            setPriceUp={setPriceUp}
          />
        </DialogContent>
        <DialogActions>
          {!(
            veg === false &&
            nonveg === false &&
            priceDown === 0 &&
            priceUp === 0 &&
            rating === 0
          ) && (
            <Button
              variant="outlined"
              style={{
                backgroundColor: "transparent",
                color: "#f85404",
                border: "0px",
              }}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
          <Button
            onClick={handleApply}
            variant="contained"
            style={{ backgroundColor: "#f85404" }}
          >
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
