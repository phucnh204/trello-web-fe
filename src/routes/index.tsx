// import { Navigate } from "react-router-dom";
import Board from "../pages/Boards/_id";
import AllBoards from "../pages/Boards/BoardContent/AllBoards";


const routes = [
  {
    path: "/",
    element: <Board />,
  },
  {
    path: "/boards",
    element: <AllBoards />,
  },
  {
    path: "/boards/:id",
    element: <Board />,
  },
];

export default routes;
