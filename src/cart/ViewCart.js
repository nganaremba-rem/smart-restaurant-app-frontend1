import { useEffect } from "react";
import Cart from "./Cart";
export default function ViewCart({ socket, room }) {
  const user = JSON.parse(localStorage.getItem("SRA_userData"));
  const role = user.role;
  return (
    <div className="main-div">
      <Cart socket={socket} room={room} />
    </div>
  );
}
