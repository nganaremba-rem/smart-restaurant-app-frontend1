import io from "socket.io-client";
import React from "react";
import Config from "../config/Config";
let x = Config.API_BASE_URL;

let connectionString  = "http://10.250.1.216:5000";
if(x.includes("localhost")){
  connectionString = "http://localhost:5000";
}
export const socket = io.connect(`${connectionString}`, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
