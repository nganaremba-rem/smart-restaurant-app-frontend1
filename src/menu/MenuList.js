import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SingleItem from "./SingleItem";
import "./viewMenu.css";
import GetReq from "../GetReq";
import { Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrimarySearchAppBar from "../appbar/PrimarySearchAppBar.js";
import BrowseMenu from "./BrowseMenu";
import Animation from "../Animation";
const MenuList = ({ socket, room }) => {
  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const [sortedDishes, setSortedDishes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const role = user.role;
  const naviagte = useNavigate();

  const { cartItems, addToCart, getCartTotal, removeFromCart } =
    useContext(CartContext);
  useEffect(() => {
    GetReq("http://localhost:8000/api/v1/menuItems/?", setIsLoading)
      .then((res) => {
        let dishes = res;
        const cuisineCounts = [];

        dishes.forEach((dish) => {
          const cuisine = dish.cuisine;
          const pairIndex = cuisineCounts.findIndex(
            (pair) => pair.cuisine === cuisine
          );

          if (pairIndex === -1) {
            // If the cuisine is not in cuisineCounts, add it as a new pair.
            cuisineCounts.push({ cuisine, count: 1 });
          } else {
            // If the cuisine is already in cuisineCounts, increment its count.
            cuisineCounts[pairIndex].count++;
          }
        });

        setCuisines(cuisineCounts);
        dishes.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        let currentCuisine = null;
        let currentGroup = null;
        let temp = [];
        for (const dish of dishes) {
          if (dish.cuisine !== currentCuisine) {
            currentCuisine = dish.cuisine;
            currentGroup = [];
            temp.push(currentGroup);
          }
          currentGroup.push(dish);
        }
        setSortedDishes(temp);
        console.log(sortedDishes);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);
  const viewCartFooter = (
    <Box
      className="view-cart-footer"
      sx={{
        width: { md: "100%", xs: "100%", lg: "60%", xl: "60%" },
        marginLeft: { md: "0%", xs: "0%", lg: "20%", xl: "20%" },
        marginRight: { md: "0%", xs: "0%", lg: "20%", xl: "20%" },
      }}
    >
      <p style={{ display: "inline-block" }}>
        {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} |
        &#x20B9;
        {getCartTotal()}
      </p>
      <Button onClick={() => naviagte("/cart")} sx={{ color: "white" }}>
        View Cart <ShoppingCartIcon />
      </Button>
    </Box>
  );
  return (
    <div className="main-div">
      <Box marginTop="4.5em">
        <BrowseMenu cuisines={cuisines} />
      </Box>
      <PrimarySearchAppBar numberOfCartItems={cartItems.length} role={role} />
      {isLoading && <Animation />}
      {sortedDishes.map((menuItems) => (
        <Box key={menuItems[0].cuisine} id={menuItems[0].cuisine}>
          <Box sx={{ marginLeft: { lg: "25%", xl: "25%", md: "10%" } }}>
            <h1 style={{ fontFamily: "'Satisfy', cursive", color: "#ff001f" }}>
              {menuItems[0].cuisine}
            </h1>
          </Box>
          {menuItems.map((menuItem) => (
            <SingleItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={addToCart}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          ))}
        </Box>
      ))}
      <div>{cartItems.length > 0 ? viewCartFooter : <p></p>}</div>
    </div>
  );
};

export default MenuList;
