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
import { getUserId } from "../../../utils/auth";
import AddIcon from "@mui/icons-material/Add";

interface Board {
  _id: string;
  title: string;
  description?: string;
  createdAt?: string;
  backgroundColor?: string;
}

// Hàm kiểm tra màu gradient
const isGradient = (color: string) => color.startsWith("linear-gradient");

// Hàm lấy màu chữ phù hợp cho nền (gradient hoặc màu đơn)
const getContrastColor = (backgroundColor: string): string => {
  if (isGradient(backgroundColor)) {
    // Nếu là gradient, dùng màu trắng cho chữ
    return "#fff";
  }
  if (backgroundColor === "#fff" || backgroundColor === "#ffffff")
    return "#222";
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#2c3e50" : "#ffffff";
};

interface AllBoardsProps {
  onBoardSelect?: (title: string) => void;
}

const AllBoards = ({ onBoardSelect }: AllBoardsProps) => {
  const [showBoards] = useState(true);
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Board | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [navigatingId] = useState<string | null>(null); // Thêm state cho loading
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id;
  // Lấy danh sách boards từ API
  const { data = [], isLoading } = useQuery<Board[]>({
    queryKey: ["boards", userId],
    queryFn: async (): Promise<Board[]> => {
      const userId = getUserId();

      const res = await axiosClient.get<Board[]>(`/boards?userId=${userId}`);
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
    const board = data.find((b) => b._id === boardId);
    if (onBoardSelect && board) {
      onBoardSelect(board.title);
    }
    setSelectedBoardId(boardId); // Đảm bảo cập nhật selectedBoardId khi click
    // Force update to parent immediately
    setTimeout(() => {
      navigate(`/boards/${boardId}`);
    }, 0);
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
          width: { xs: "100vw", sm: 320, md: 360, lg: 400 },
          minWidth: { xs: "0", sm: 240, md: 280, lg: 320 },
          maxWidth: 500,
          borderRight: "0.5px solid #ccc",
          p: { xs: 1, sm: 2 },
          overflowY: "auto",
          bgcolor: "primary.50",
          transition: "width 0.3s ease",
          mt: { xs: 1, sm: 3, md: 5 },
        }}
      >
        <Collapse in={showBoards}>
          <Stack spacing={2}>
            {data.map((board) => {
              const backgroundColor = board.backgroundColor || "#0079BF";
              const textColor = getContrastColor(backgroundColor);
              const isNavigating = navigatingId === board._id;
              const isGradientBg = isGradient(backgroundColor);

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
                        width: "100%",
                        minWidth: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        p: { xs: 1, sm: 1.5 },
                        borderRadius: 3,
                        boxShadow: selectedBoardId === board._id ? 8 : 2,
                        border:
                          selectedBoardId === board._id
                            ? "2.5px solid #0c66e4"
                            : "none",
                        transition: "all 0.22s cubic-bezier(.4,2,.6,1)",
                        background: isGradientBg ? backgroundColor : undefined,
                        backgroundColor: !isGradientBg
                          ? backgroundColor
                          : undefined,
                        opacity: isNavigating ? 0.7 : 1,
                        transform: isNavigating
                          ? "scale(0.98)"
                          : hoveredId === board._id
                          ? "translateY(-2px) scale(1.02)"
                          : "none",
                        "&:hover": !isNavigating
                          ? {
                              boxShadow: selectedBoardId === board._id ? 12 : 4,
                              filter: "brightness(1.04)",
                              transform: "scale(1.03) translateY(-3px)",
                            }
                          : {},
                        color: textColor,
                        position: "relative",
                        overflow: "hidden",
                        borderBottom:
                          backgroundColor === "#fff"
                            ? "1.5px solid #e0e0e0"
                            : undefined,
                      }}
                    >
                      <StickyNote2 sx={{ color: textColor, opacity: 0.85 }} />

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
                              backgroundColor: isGradientBg
                                ? "rgba(255,255,255,0.18)"
                                : "rgba(255,255,255,0.2)",
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
                          fontWeight={700}
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
                            letterSpacing: 0.2,
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#fff",
                              textShadow: isGradientBg
                                ? "0 2px 8px #0006"
                                : undefined,
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
                              bgcolor: isGradientBg
                                ? "rgba(255,255,255,0.18)"
                                : "rgba(255,255,255,0.2)",
                              opacity: 1,
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <CloseRounded fontSize="small" />
                        </IconButton>
                      )}

                      {isNavigating && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: isGradientBg
                              ? "rgba(0,0,0,0.08)"
                              : "rgba(255,255,255,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                          }}
                        >
                          <CircularProgress
                            size={28}
                            sx={{ color: textColor }}
                          />
                        </Box>
                      )}
                    </Card>
                  </Box>
                </Box>
              );
            })}

            <Button
              onClick={() => setOpen(true)}
              startIcon={<AddIcon />}
              sx={{
                width: "100%",
                borderRadius: 3,
                px: { xs: 1, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                fontWeight: 600,
                fontSize: { xs: 15, sm: 16 },
                color: "#00C2E0",
                background: "rgba(0,194,224, 0.08)",
                backdropFilter: "blur(6px)",
                border: "1.5px solid rgba(0,194,224, 0.2)",
                textTransform: "none",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  background: "rgba(0,194,224, 0.15)",
                  boxShadow: "0 4px 16px rgba(0,194,224, 0.25)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 8px rgba(0,194,224, 0.3)",
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
