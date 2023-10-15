import { Typography } from "@mui/material";
import React from "react";
// https://www.npmjs.com/package/react-switch SWITCH docs
function UpperForm({
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
  return (
    <>
      <Typography variant="h6">Veg/Non-Veg</Typography>
      <input
        type="radio"
        id="veg"
        name="is-veg"
        value="veg"
        onChange={() => {
          setNonveg(false);
          setVeg(!veg);
        }}
        style={{ accentColor: "#f85404" }}
        checked={veg}
      ></input>
      <label htmlFor="veg">Pure Veg</label>
      <br></br>
      <input
        type="radio"
        id="non-veg"
        name="is-veg"
        value="non-veg"
        onChange={() => {
          setVeg(false);
          setNonveg(!nonveg);
        }}
        style={{ accentColor: "#f85404", marginTop: "10px" }}
        checked={nonveg}
      ></input>
      <label htmlFor="non-veg">Non Veg</label>
      <br></br>
      <Typography variant="h6">Sort By</Typography>
      {/* Change styling of buttons when clicked */}
      <input
        type="radio"
        id="rating-hl"
        name="rating-hl"
        value="rating-hl"
        onChange={() => {
          setRating(!rating);
        }}
        style={{ accentColor: "#f85404" }}
        checked={rating}
      ></input>
      <label htmlFor="rating-hl">Rating - high to low </label>
      <br></br>
      <input
        type="radio"
        id="price-lh"
        name="price"
        value="price-lh"
        onChange={() => {
          setPriceDown(0);
          setPriceUp(!priceUp);
        }}
        style={{ accentColor: "#f85404", marginTop: "10px" }}
        checked={priceUp}
      ></input>
      <label htmlFor="price-lh">Price - low to high </label>
      <br></br>

      <input
        type="radio"
        id="price-hl"
        name="price"
        value="price-hl"
        onChange={() => {
          setPriceUp(0);
          setPriceDown(!priceDown);
        }}
        style={{ accentColor: "#f85404", marginTop: "10px" }}
        checked={priceDown}
      ></input>
      <label htmlFor="price-hl">Price - high to low </label>
      <br></br>
    </>
  );
}

export default UpperForm;
