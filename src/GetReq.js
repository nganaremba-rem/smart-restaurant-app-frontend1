import Axios from "axios";

export default async function GetReq(query, setIsLoading) {
  setIsLoading(true);
  const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
  const response = await Axios.get(query, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  setIsLoading(false);

  return response.data;
}
