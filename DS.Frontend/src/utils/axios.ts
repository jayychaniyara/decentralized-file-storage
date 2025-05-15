import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://blockstore-backend.onrender.com" 
    : import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL,
});
export default instance;
