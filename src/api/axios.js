import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://airbnb-backend-07gj.onrender.com/api";

export default axios.create({
  baseURL: API_BASE,
});
