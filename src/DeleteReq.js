import Axios from "axios";

export default async function DeleteReq(query) {
  const token = JSON.parse(localStorage.getItem("SRA_userData")).token;
  await Axios.delete(query, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
