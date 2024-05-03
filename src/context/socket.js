import React from "react";
import io from "socket.io-client";
// const x = Config.API_BASE_URL;
import { baseURL } from "../config/Config";

// let connectionString = "https://smart-restaurant-app-backend.vercel.app";
// if (x.includes("smart-restaurant-app-backend.vercel.app")) {
// 	connectionString = "https://smart-restaurant-app-backend.vercel.app";
// }

// export const socket = io("http://localhost:5000");
export const socket = io(baseURL);

socket.on("connect", () => {
	console.log("Socket connected", socket.id);
});

socket.on("disconnect", () => {
	console.log(socket.id); // undefined
});

export const SocketContext = React.createContext();
