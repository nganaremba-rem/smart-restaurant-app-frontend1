import { useContext } from "react";
import { CartContext } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TocIcon from "@mui/icons-material/Toc";
import PlaceOrderButton from "./PlaceOrderButton";
import PrimarySearchAppBar from "../appbar/PrimarySearchAppBar";
export default function Cart() {
  const { cartItems, addToCart, removeFromCart, getCartTotal } =
    useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  const navigate = useNavigate();
  return (
    <Box
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <PrimarySearchAppBar numberOfCartItems={cartItems.length} role={role} />
      <Box
        style={{ display: "inline-block", margin: "0 auto", marginTop: "5em" }}
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "30%",
            lg: "35%",
            xl: "35%",
          },
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #D3D3D3",
            paddingBottom: "15px",
          }}
        >
          <Button
            onClick={() => navigate("/menu")}
            variant="outlined"
            style={{
              color: "#ff841c",
              borderColor: "#ff841c",
              backgroundColor: "transparent",
              marginRight: "5%",
            }}
          >
            Menu <RestaurantMenuIcon />
          </Button>
          <Button
            onClick={() => navigate("/orders")}
            variant="outlined"
            style={{
              color: "#ff841c",
              borderColor: "#ff841c",
              backgroundColor: "transparent",
            }}
          >
            Orders <TocIcon />
          </Button>
        </Box>
        <Box style={{ marginTop: "30px", borderBottom: "2px solid #D3D3D3" }}>
          {cartItems.map((item) => (
            <div key={item._id}>
              <Box
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={item.isVeg ? "veg.png" : "non-veg.png"}
                    width="20px"
                    height="20px"
                    style={{ position: "relative", top: "5px" }}
                    alt={item.name}
                  />
                  <Typography display="inline-block">{item.name} </Typography>
                </div>
                <div style={{ width: "25%" }}>
                  <Button
                    disableRipple
                    variant="contained"
                    style={{
                      color: "#6cb752",
                      backgroundColor: "white",
                      height: "25px",
                      width: "100px",
                    }}
                  >
                    <Button
                      disableRipple
                      style={{
                        backgroundColor: "transparent",
                        color: "gray",
                        height: "20px",
                        overflow: "hidden",
                      }}
                      onClick={() => {
                        removeFromCart(item);
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    {item.quantity}
                    <Button
                      disableRipple
                      variant="text"
                      style={{
                        color: "#6cb752",
                        backgroundColor: "transparent",
                        height: "20px",
                      }}
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Button>
                </div>
                <div style={{ width: "25%" }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                    display="inline-block"
                  >
                    <span>&#8377;</span> {item.price}
                  </Typography>
                </div>
              </Box>
            </div>
          ))}
        </Box>
        {cartItems.length > 0 ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div>
              <Typography variant="h6">
                Item Total{":    "}
                <span>&#8377;</span>
                {getCartTotal()}
              </Typography>
            </div>
            <div>
              <PlaceOrderButton />
            </div>
          </Box>
        ) : (
          <Typography variant="h4" style={{ color: "gray" }}>
            Cart is empty
          </Typography>
        )}
      </Box>
    </Box>
  );
}
