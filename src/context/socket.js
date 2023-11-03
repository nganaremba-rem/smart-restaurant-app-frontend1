import io from "socket.io-client";
import React from "react";
export const socket = io.connect("http://10.250.1.216:5000", {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
