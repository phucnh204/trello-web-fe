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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import axiosClient from "../../../apis/axiosClient";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import BoardCreateModal from "../../../components/BoardCreateModal/BoardCreateModal";
import { enqueueSnackbar } from "notistack";
import { CloseRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Board {
  _id: string;
  title: string;
  description?: string;
  createdAt?: string;
  backgroundColor?: string;
}

// Hàm để kiểm tra độ sáng của màu và trả về màu text phù hợp
const getContrastColor = (backgroundColor: string): string => {
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#2c3e50" : "#ffffff";
};

const AllBoards = () => {
  const [showBoards] = useState(true);
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Board | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [navigatingId, setNavigatingId] = useState<string | null>(null); // Thêm state cho loading
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  // Handle click với smooth transition
  const handleCardClick = async (boardId: string) => {
    setNavigatingId(boardId);
    setSelectedBoardId(boardId);

    setTimeout(() => {
      navigate(`/boards/${boardId}`);
    }, 100);
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

  const handleUpdateTitle = async (boardId: string) => {
    if (!editedTitle.trim() || editedTitle === originalTitle) {
      setEditingId(null);
      return;
    }

    try {
      await axiosClient.put(`/boards/${boardId}`, { title: editedTitle });
      enqueueSnackbar("Đã cập nhật tiêu đề", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    } catch (err) {
      enqueueSnackbar("Cập nhật thất bại: " + err, { variant: "error" });
      setEditedTitle(originalTitle);
    } finally {
      setEditingId(null);
    }
  };

  const handleStartEdit = (board: Board) => {
    setEditingId(board._id);
    setEditedTitle(board.title);
    setOriginalTitle(board.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
    setOriginalTitle("");
  };

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
          mt: 5,
        }}
      >
        <Collapse in={showBoards}>
          <Stack spacing={2}>
            {data.map((board) => {
              const backgroundColor = board.backgroundColor || "#0079BF";
              const textColor = getContrastColor(backgroundColor);
              const isNavigating = navigatingId === board._id;

              return (
                <Box key={board._id} sx={{ position: "relative" }}>
                  <Box
                    onClick={() => !editingId && handleCardClick(board._id)}
                    sx={{
                      textDecoration: "none",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: editingId === board._id ? "default" : "pointer",
                      pointerEvents: editingId === board._id ? "none" : "auto",
                    }}
                  >
                    <Card
                      onMouseEnter={() =>
                        !isNavigating && setHoveredId(board._id)
                      }
                      onMouseLeave={() => setHoveredId(null)}
                      sx={{
                        width: 400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        p: 1.5,
                        borderRadius: 1,
                        boxShadow: selectedBoardId === board._id ? 6 : 1, // nổi bật hơn
                        border:
                          selectedBoardId === board._id
                            ? "2.5px solid #0c66e4"
                            : "none", // viền xanh
                        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                        backgroundColor: backgroundColor,
                        opacity: isNavigating ? 0.7 : 1,
                        transform: isNavigating
                          ? "scale(0.98)"
                          : hoveredId === board._id
                          ? "translateY(-2px)"
                          : "none",
                        "&:hover": !isNavigating
                          ? {
                              boxShadow: selectedBoardId === board._id ? 8 : 2,
                            }
                          : {},
                      }}
                    >
                      <StickyNote2 sx={{ color: textColor }} />

                      {editingId === board._id ? (
                        <TextField
                          size="small"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onBlur={() => handleUpdateTitle(board._id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateTitle(board._id);
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                          autoFocus
                          sx={{
                            flex: 1,
                            input: {
                              fontWeight: 600,
                              fontSize: "1rem",
                              color: textColor,
                            },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "rgba(255,255,255,0.2)",
                              "& fieldset": {
                                borderColor: "rgba(255,255,255,0.3)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255,255,255,0.5)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "rgba(255,255,255,0.7)",
                              },
                            },
                          }}
                        />
                      ) : (
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleStartEdit(board);
                          }}
                          sx={{
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            flex: 1,
                            color: textColor,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {board.title}
                        </Typography>
                      )}

                      {editingId !== board._id && !isNavigating && (
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteTarget(board);
                          }}
                          sx={{
                            ml: 1,
                            color: textColor,
                            opacity: 0.8,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: "rgba(255,255,255,0.2)",
                              opacity: 1,
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <CloseRounded fontSize="small" />
                        </IconButton>
                      )}
                    </Card>
                  </Box>
                </Box>
              );
            })}

            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
              }}
            >
              + Thêm bảng mới
            </Button>
            <BoardCreateModal open={open} onClose={() => setOpen(false)} />
          </Stack>
        </Collapse>
      </Box>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Xác nhận xóa bảng</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa bảng{" "}
            <strong
              style={{ color: deleteTarget?.backgroundColor || "#0079BF" }}
            >
              {deleteTarget?.title}
            </strong>{" "}
            không?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tất cả các thẻ và công việc liên quan sẽ bị xóa vĩnh viễn.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{ textTransform: "none" }}
          >
            Hủy
          </Button>
          <Button
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={async () => {
              if (!deleteTarget) return;
              try {
                await axiosClient.delete(`/boards/${deleteTarget._id}`);
                enqueueSnackbar("Đã xóa bảng thành công", {
                  variant: "success",
                });
                queryClient.invalidateQueries({ queryKey: ["boards"] });
              } catch (err) {
                enqueueSnackbar("Xóa bảng thất bại: " + err, {
                  variant: "error",
                });
              } finally {
                setDeleteTarget(null);
              }
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllBoards;
