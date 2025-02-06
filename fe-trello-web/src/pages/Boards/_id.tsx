import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function Board() {
  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <AppBar />

      <BoardBar />

      <BoardContent />
    </Container>
  );
}

export default Board;
