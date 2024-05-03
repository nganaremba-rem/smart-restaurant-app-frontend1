// @ts-check

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Animation from "../Animation";
import { socket } from "../context/socket";
import useAuth from "../hooks/useAuth";
import getUser from "../utils/getUser";

export default function ProtectedRoutes() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading)
		return (
			<div
				style={{
					display: "grid",
					placeItems: "center",
					minHeight: "100svh",
				}}
			>
				<Animation />
			</div>
		);

	// Login if not authenticated
	if (!isAuthenticated) return <Navigate to={"/signin"} replace />;

	// For Authenticated user
	const { role, _id } = getUser();

	if (role === "customer") {
		socket.emit("join_customer_room", {
			customer: _id,
		});
	}

	if (role === "chef") {
		socket.emit("join_chefs_room", { chef: `${_id}` });
	} else if (role === "waiter") {
		socket.emit("join_waiters_room", { waiter: `${_id}` });
	}

	return <Outlet />;
}
