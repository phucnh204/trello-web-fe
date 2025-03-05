// @ts-nocheck

import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "../../apis/mock-data";

const Board: React.FC = () => {
  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <AppBar />
{/*  */}
      <BoardBar board={mockData.board} />

      <BoardContent board={mockData.board} />
    </Container>
  );
};

export default Board;
