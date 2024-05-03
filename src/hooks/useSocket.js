// @ts-check
import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../context/socket";
import getUser from "../utils/getUser";

export default function useSocket() {
	const { role, _id } = getUser();

	useEffect(() => {
		socket.on("pick_order", (data) => {
			console.log("pick_order");
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("chef_ended", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("waiter_confirmed", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});
		socket.on("chef_started", (data) => {
			toast.info(data, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
				theme: "light",
			});
		});

		if (role === "waiter") {
			socket.emit("join_waiters_room", { waiter: `${_id}` });
		}
		if (role === "chef") {
			socket.emit("join_chefs_room", { chef: `${_id}` });
		}
		if (role === "customer") {
			socket.emit("join_customer_room", {
				customer: _id,
			});
		}
	}, [role, _id]);
}
