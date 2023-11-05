import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import AlertDialog from "./AlertDialog";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function SingleItem({
  menuItem,
  addToCart,
  removeFromCart,
  cartItems,
}) {
  const cartQuantity = cartItems.filter((item) => {
    return item._id === menuItem._id;
  });

  let itemName = menuItem.name;
  let itemPrice = menuItem.price;
  let itemRating = menuItem.averageRating;
  let numberOfRatings = menuItem.numberOfRatings;
  let description = menuItem.description;
  let spiciness = menuItem.spicinessLevel;
  let imageURL = menuItem.imageURL;
  let preparationTime = menuItem.preparationTime;
  let isVeg = menuItem.isVeg ? "veg.png" : "non-veg.png";
  let starColor;
  if (itemRating >= 4) {
    starColor = "#008631";
  } else if (itemRating >= 3) {
    starColor = "#00ab41";
  } else if (itemRating >= 2) {
    starColor = "#00c04b";
  } else if (itemRating >= 0) {
    starColor = "#1fd655";
  }
  return (
    <Box
      borderTop="2px solid #D3D3D3"
      sx={{
        width: { xs: "100%", md: "80%", lg: "50%", xl: "50%", sm: "100%" },
        marginLeft: { lg: "25%", xl: "25%", md: "10%" },
        position: "relative",
        height: "28vh",
      }}
      paddingBottom="35px"
    >
      <Card
        sx={{
          display: "flex",
          marginTop: 3,
          borderRadius: 4,
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <img src={isVeg} style={{ width: 20, height: 20 }} alt="icon"></img>

            <Typography variant="subtitle1">
              <b>{itemName}</b>
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              <span>&#8377;</span> {itemPrice}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              display="inline"
            >
              {numberOfRatings !== 0 && (
                <StarIcon style={{ color: starColor, display: "inline" }} />
              )}
              {numberOfRatings !== 0 && (
                <b>
                  <span
                    style={{
                      position: "relative",
                      bottom: 5,
                      color: starColor,
                    }}
                  >
                    {itemRating}
                  </span>
                </b>
              )}
              {numberOfRatings !== 0 && (
                <span style={{ position: "relative", bottom: 5 }}>
                  {" ("}
                  {numberOfRatings}
                  {")"}
                </span>
              )}
            </Typography>
            <Typography variant="h6">
              {spiciness === 1 && "🌶️"}
              {spiciness === 3 && "🌶️🌶️🌶️"} {spiciness === 2 && "🌶️🌶️"}
            </Typography>
            <AlertDialog
              imageURL={imageURL}
              description={description}
              calories={menuItem.calories}
            />
          </CardContent>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "none",
              lg: "none",
              xl: "flex",
              sm: "none",
            },
            alignItems: "center",
            color: "gray",
            flex: "0 0 300px",
          }}
        >
          <Typography>
            {description} <br></br> <b>calories: {menuItem.calories}</b>{" "}
            {preparationTime && <p>preparationTime: {preparationTime} min.</p>}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: "150px",
            height: "24vh",
            flex: 1,
            borderRadius: 4,
            marginBottom: 0,
          }}
          image={imageURL}
          alt="image not available"
        ></CardMedia>
        <Box
          style={{
            position: "absolute",
            backgroundColor: "transparent",
          }}
          sx={{
            right: {
              xl: "65px",
              lg: "65px",
              md: "130px",
              sm: "70px",
              xs: "40px",
            },
            bottom: { xl: "25px", lg: "25px", sm: "20px", xs: "25px" },
          }}
        >
          {cartQuantity.length === 0 && (
            <Button
              variant="contained"
              style={{
                color: "#6cb752",
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100px",
              }}
              onClick={() => {
                addToCart(menuItem);
              }}
            >
              ADD
            </Button>
          )}
          {cartQuantity.length > 0 && (
            <Button
              disableRipple
              variant="contained"
              style={{
                color: "#6cb752",
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              <Button
                disableRipple
                style={{
                  backgroundColor: "transparent",
                  color: "gray",
                  height: "25px",
                  overflow: "hidden",
                }}
                onClick={() => {
                  removeFromCart(menuItem);
                }}
              >
                <RemoveIcon />
              </Button>
              {cartQuantity[0] ? cartQuantity[0].quantity : ""}
              <Button
                disableRipple
                variant="text"
                style={{
                  color: "#6cb752",
                  backgroundColor: "transparent",
                  height: "25px",
                }}
                onClick={() => {
                  addToCart(menuItem);
                }}
              >
                <AddIcon />
              </Button>
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
}
