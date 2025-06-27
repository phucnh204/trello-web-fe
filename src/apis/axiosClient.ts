// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosClient;
// src/api/axiosClient.ts hoặc tương tự
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
