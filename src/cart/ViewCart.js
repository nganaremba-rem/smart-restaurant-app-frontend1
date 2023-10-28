import React from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
export default function ViewCart() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SRA_userData"));
    if (!user) {
      navigate("/unauthorized");
    } else {
      const token = user.token;
      if (!token) {
        // If the token is not present, redirect to Signin page
        navigate("/unauthorized");
      } else {
        // Parse the token to get the expiration timestamp
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > exp) {
          // If the token is expired, redirect to Signin page
          navigate("/unauthorized");
        }
      }
    }
  }, []);
  return (
    <div className="main-div">
      <Cart />
    </div>
  );
}
