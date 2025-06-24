import { useBoard } from "../../hooks/useBoard";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { Container, CircularProgress, Typography } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
// import { useParams } from "react-router-dom";

const Board = () => {
  // const { id } = useParams(); // route: /boards/:id
  const { data, isLoading, error } = useBoard("board-id-01");

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Lỗi tải dữ liệu</Typography>;
  if (!data || !data.board) {
    return <Typography color="error">Không tìm thấy dữ liệu board</Typography>;
  }
  
  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <AppBar />
      
      <BoardBar board={data.board} />
      <BoardContent board={data.board} />
    </Container>
  );
};

export default Board;
