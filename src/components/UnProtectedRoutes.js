import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Animation from "../Animation";
import useAuth from "../hooks/useAuth";

export default function UnProtectedRoutes() {
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

	if (isAuthenticated) return <Navigate replace to={"/"} />;

	return <Outlet />;
}
