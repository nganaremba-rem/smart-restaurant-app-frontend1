import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Animation from "../Animation";
import GetReq from "../GetReq";
import PrimarySearchAppBar from "../appbar/PrimarySearchAppBar.js";
import Config from "../config/Config.js";
import OrderList from "./OrderList";
function PastOrders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const user = JSON.parse(localStorage.getItem("SRA_userData"));
	const role = user.role;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let apiURL = `${Config.API_BASE_URL}orders?`;
		if (role === "customer") {
			apiURL += `sort=-createdAt&user=${user._id}&status=payment_done`;
		}
		GetReq(apiURL, setIsLoading)
			.then((res) => {
				setOrders(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className="main-div-order">
			<PrimarySearchAppBar role={role} />
			{isLoading && <Animation />}
			<Box
				style={{
					marginTop: "4.5em",
					display: "flex",
					justifyContent: "center",
				}}
			/>
			<OrderList
				orders={orders}
				role={role}
				setOrders={setOrders}
				page="past-orders"
			/>
		</div>
	);
}

export default PastOrders;
