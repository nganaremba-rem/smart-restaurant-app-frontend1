// @ts-check

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Axios } from "../utils/axiosInstance";
import getUser from "../utils/getUser";
import { socket } from "./socket";

export const AuthProviderContext = createContext({
	isAuthenticated: false,
	login: ({ email, password }) => {},
	logout: () => {},
	isLoading: true,
});
export default function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { _id, token } = getUser();

	const login = async ({ email, password }) => {
		try {
			const { data } = await Axios.post("/users/signin", {
				email,
				password,
			});

			if (data) {
				setIsAuthenticated(true);
				toast.success("Logged in successfully!");
				localStorage.setItem("SRA_userData", JSON.stringify(data));
			}
			// else navigate("/orders");
		} catch (error) {
			console.error(error);
			toast.error(`${error.response.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			setIsAuthenticated(false);
			localStorage.removeItem("SRA_userData");
			socket.emit("leave_all_rooms");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		try {
			if (!_id) {
				setIsAuthenticated(false);
			}

			if (
				token &&
				Math.floor(Date.now() / 1000) <
					JSON.parse(atob(token.split(".")[1])).exp
			) {
				setIsAuthenticated(true);
			} else {
				logout();
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}, [_id, token, logout]);

	return (
		<AuthProviderContext.Provider
			value={{ isAuthenticated, login, logout, isLoading }}
		>
			{children}
		</AuthProviderContext.Provider>
	);
}
