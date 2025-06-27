// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
