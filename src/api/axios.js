import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 
                 (import.meta.env.MODE === "development"
                 ? "http://localhost:5000"
                 : "https://airbnb-backend-07gj.onrender.com");

export default axios.create({ baseURL: API_BASE });