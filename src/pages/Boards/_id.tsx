import { useParams } from "react-router-dom";
import { useLatestBoardId } from "../../hooks/useLatestBoardId";
import { useBoard } from "../../hooks/useBoard";
import { CircularProgress, Container, Typography, Box } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import NoBoard from "../../components/NoBoard/NoBoard";

const Board = () => {
  const { id } = useParams();
  const { data: board, isLoading: loadingLatest } = useLatestBoardId();
  const selectedId = id || board;
  const { data, isLoading, error } = useBoard(selectedId ?? "");

  if (isLoading || loadingLatest)
    return (
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f4f6fa"
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#00C2E0" }} />
      </Box>
    );
  if (error)
    return (
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f4f6fa"
      >
        <Typography color="error" fontSize={22} fontWeight={600}>
          Lỗi tải dữ liệu
        </Typography>
      </Box>
    );
  if (!data || !data.board) return <NoBoard />;

  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <AppBar />

      <BoardBar board={data.board} />

      <BoardContent board={data.board} />
    </Container>
  );
};

export default Board;
