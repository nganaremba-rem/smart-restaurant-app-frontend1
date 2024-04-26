import React from "react";
import io from "socket.io-client";
import Config from "../config/Config";
let x = Config.API_BASE_URL;

let connectionString = "https://smart-restaurant-app-backend.vercel.app";
if (x.includes("smart-restaurant-app-backend.vercel.app")) {
	connectionString = "https://smart-restaurant-app-backend.vercel.app";
}
export const socket = io.connect(`${connectionString}`, {
	transports: ["websocket"],
});
export const SocketContext = React.createContext();
