import React from "react";
import io from "socket.io-client";
import Config from "../config/Config";
const x = Config.API_BASE_URL;

let connectionString = "https://smart-restaurant-app-backend.vercel.app";
if (x.includes("smart-restaurant-app-backend.vercel.app")) {
	connectionString = "https://smart-restaurant-app-backend.vercel.app";
}

// export const socket = io("http://localhost:5000");
export const socket = io("https://smart-restaurant-app-backend.vercel.app");

socket.on("connect", () => {
	console.log("Socket connected", socket.id);
});

socket.on("disconnect", () => {
	console.log(socket.id); // undefined
});

export const SocketContext = React.createContext();
