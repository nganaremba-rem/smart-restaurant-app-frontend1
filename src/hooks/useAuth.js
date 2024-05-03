import { useContext } from "react";
import { AuthProviderContext } from "../context/AuthProvider";

export default function useAuth() {
	return useContext(AuthProviderContext);
}
