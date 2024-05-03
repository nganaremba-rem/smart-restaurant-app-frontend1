import axios from "axios";
import { API_BASE_URL } from "../config/Config";

export const Axios = axios.create({
	baseURL: API_BASE_URL,
});
