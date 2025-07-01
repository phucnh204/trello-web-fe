import { Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Board from "../pages/Boards/_id";
// import AllBoards from "../pages/Boards/BoardContent/AllBoards";
import { getToken } from "../utils/auth";

const isAuthenticated = !!getToken();

const routes = [
  {
    path: "/",
    element: isAuthenticated ? <Board /> : <Navigate to="/login" replace />,
  },
  {
    path: "/boards",
    element: <Board />,
  },
  {
    path: "/boards/:id",
    element: <Board />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
