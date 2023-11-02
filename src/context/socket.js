import io from "socket.io-client";
import React from "react";
export const socket = io.connect("https://smartmess.iitdh.ac.in/restaurant/", {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
