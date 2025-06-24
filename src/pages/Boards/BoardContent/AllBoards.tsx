import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Card,
  Collapse,
  Stack,
  Button,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosClient from "../../../apis/axiosClient";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import BoardCreateModal from "../../../components/BoardCreateModal/BoardCreateModal";
import { enqueueSnackbar } from "notistack";
import { CloseRounded } from "@mui/icons-material";

interface Board {
  _id: string;
  title: string;
  description?: string;
  createdAt?: string;
}

const AllBoards = () => {
  const [showBoards] = useState(true);
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // Lấy danh sách boards từ API
  const { data = [], isLoading } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: async (): Promise<Board[]> => {
      const res = await axiosClient.get<Board[]>("/boards?userId=user-dev-01");
      return res.data
        .filter((board) => board.createdAt) 
        .sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
    },
  });

  // Hàm xử lý xoá bảng
  const handleDelete = async (boardId: string) => {
    try {
      await axiosClient.delete(`/boards/${boardId}`);
      enqueueSnackbar("Đã xoá kế hoạch thành công", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    } catch (err) {
      enqueueSnackbar("Xoá kế hoạch thất bại", { variant: "error" });
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1" color="text.secondary">
          Đang tải dữ liệu...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", height: "98%" }}>
      <Box
        component="aside"
        sx={{
          width: 400,
          borderRight: "0.5px solid #ccc",
          p: 2,
          overflowY: "auto",
          bgcolor: "primary.50",
          transition: "width 0.3s ease",
          mt: 10,
        }}
      >
        <Collapse in={showBoards}>
          <Stack spacing={2}>
            {data.map((board) => (
              <Card
                key={board._id}
                onMouseEnter={() => setHoveredId(board._id)}
                onMouseLeave={() => setHoveredId(null)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: "all 0.3s ease-in-out",
                  bgcolor: "background.paper",
                  transform:
                    hoveredId === board._id
                      ? "translateY(-2px) scale(1.01)"
                      : "none",
                  "&:hover": {
                    boxShadow: 5,
                    bgcolor: "primary.50",
                  },
                }}
              >
                <Link
                  to={`/boards/${board._id}`}
                  style={{
                    textDecoration: "none",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <StickyNote2 color="primary" />
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight={600}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {board.title}
                  </Typography>
                </Link>

                <Fade in={hoveredId === board._id}>
                  <IconButton
                    onClick={() => handleDelete(board._id)}
                    sx={{
                      ml: 1,
                      color: "error.main",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <CloseRounded fontSize="small" />
                  </IconButton>
                </Fade>
              </Card>
            ))}

            <Button variant="outlined" onClick={() => setOpen(true)}>
              + Thêm
            </Button>
            <BoardCreateModal open={open} onClose={() => setOpen(false)} />
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default AllBoards;
