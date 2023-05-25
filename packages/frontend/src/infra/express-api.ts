import axios from "axios";

const expressAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API_URL,
});

export default expressAPI;
