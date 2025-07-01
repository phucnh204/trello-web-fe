import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCardIcon from "@mui/icons-material/AddCard";
// import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "../../../../../utils/sort";
import { ColumnProps, IColumn } from "./type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { columnAPI } from "../../../../../apis/column.api";
import { enqueueSnackbar } from "notistack";
import { cardAPI } from "../../../../../apis/card.api";

const Column: React.FC<ColumnProps> = ({
  column,
  onColumnTitleUpdated,
  onColumnDeleted,
  onCardAdded,
}) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: { ...column },
  });

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  const [openAddCard, setOpenAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const createCardMutation = useMutation({
    mutationFn: cardAPI.createCard,
    onSuccess: (newCard) => {
      queryClient.invalidateQueries({
        queryKey: ["columns", column.boardId],
      });

      enqueueSnackbar("Đã thêm card", { variant: "success" });
      setCardTitle("");
      setOpenAddCard(false);
      onCardAdded?.(column._id, newCard);
    },
    onError: (error) => {
      console.error("❌ Lỗi thêm card:", error);
      enqueueSnackbar("Thêm card thất bại", { variant: "error" });
    },
  });
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateColumnTitleMutation = useMutation({
    mutationFn: ({ columnId, title }: { columnId: string; title: string }) =>
      columnAPI.updateColumn(columnId, title),

    onSuccess: () => {
      enqueueSnackbar("Đã cập nhật tiêu đề cột", { variant: "success" });

      queryClient.setQueryData<IColumn[]>(
        ["columns", column.boardId],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((col) =>
            col._id === column._id ? { ...col, title: newTitle } : col
          );
        }
      );

      onColumnTitleUpdated?.(column._id, newTitle);
    },

    onError: () => {
      enqueueSnackbar("Cập nhật tiêu đề thất bại", { variant: "error" });
    },
  });

  const handleSaveTitle = () => {
    if (!newTitle.trim() || newTitle === column.title) {
      setIsEditingTitle(false);
      setNewTitle(column.title);
      return;
    }

    updateColumnTitleMutation.mutate({ columnId: column._id, title: newTitle });
    setIsEditingTitle(false);
  };

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: string) => columnAPI.deleteColumn(columnId),
    onSuccess: () => {
      enqueueSnackbar("Đã xóa cột", { variant: "success" });

      // Gọi callback để parent component cập nhật state
      onColumnDeleted?.(column._id);

      // Đóng menu dropdown
      handleClose();
    },
    onError: () => {
      enqueueSnackbar("Xóa cột thất bại", { variant: "error" });
    },
  });

  const handleDeleteColumn = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteColumnMutation.mutate(column._id);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: { xs: "85vw", sm: 260, md: 300 },
          maxWidth: { xs: "85vw", sm: 260, md: 300 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: { xs: 0, md: 2 },
          mt: 1,
          borderRadius: "12px",
          height: "fit-content",
          maxHeight: "80vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          boxShadow: "0 4px 24px 0 #00C2E022",
          border: "1.5px solid #e0f7fa",
          transition: "box-shadow 0.2s, border 0.2s",
          "&:hover": {
            boxShadow: "0 8px 32px 0 #00C2E044",
            border: "1.5px solid #00C2E0",
          },
          "&::-webkit-scrollbar-track": {
            marginY: "55px",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            position: "relative",
            right: 0,
          },
        }}
      >
        {/* Card header */}
        <Box
          sx={{
            height: "55px",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#00C2E0",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            boxShadow: "0 2px 8px 0 #00C2E022",
          }}
        >
          {isEditingTitle ? (
            <TextField
              variant="standard"
              value={newTitle}
              autoFocus
              onBlur={handleSaveTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") {
                  setNewTitle(column.title);
                  setIsEditingTitle(false);
                }
              }}
              inputProps={{
                style: { fontWeight: "bold", fontSize: 17, color: "#00C2E0" },
                maxLength: 50,
              }}
              sx={{
                width: "90%",
                "& .MuiInputBase-root": {
                  color: "#00C2E0",
                  fontWeight: 700,
                  fontSize: 17,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#00C2E0",
                },
              }}
            />
          ) : (
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 17,
                color: "#00C2E0",
                letterSpacing: 0.2,
                px: 1,
                borderRadius: 2,
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  background: "#e0f7fa",
                  color: "#0099b7",
                },
              }}
              onClick={() => setIsEditingTitle(true)}
            >
              {newTitle}
            </Typography>
          )}

          <Box>
            <Tooltip title="Tùy chọn cột" arrow>
              <Button
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  minWidth: 36,
                  color: "#00C2E0",
                  borderRadius: 2,
                  "&:hover": {
                    background: "#e0f7fa",
                  },
                }}
              />
            </Tooltip>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  minWidth: 180,
                  boxShadow: "0 4px 24px #00C2E044",
                },
              }}
            >
              <MenuItem onClick={handleDeleteColumn}>
                <ListItemIcon>
                  <DeleteOutlineIcon
                    fontSize="small"
                    sx={{ color: "#e53935" }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ color: "#e53935" }}>Xóa cột</ListItemText>
              </MenuItem>
              <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
                <DialogTitle sx={{ fontWeight: 700, color: "#e53935" }}>
                  Bạn có chắc muốn xóa cột này không?
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={handleCancelDelete}
                    sx={{
                      color: "#5e6c84",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#e0f7fa", color: "#00C2E0" },
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    variant="outlined"
                    sx={{
                      color: "#e53935",
                      borderColor: "#e53935",
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#ffebee",
                        borderColor: "#e53935",
                      },
                    }}
                  >
                    Xóa
                  </Button>
                </DialogActions>
              </Dialog>
            </Menu>
          </Box>
        </Box>

        {/* Card content */}
        <ListCards cards={orderedCards} />

        {/* Card footer */}
        <Box sx={{ px: 2, width: "100%", pb: 2 }}>
          {openAddCard ? (
            <>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tiêu đề..."
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    fontSize: 15,
                    fontWeight: 600,
                    "& fieldset": {
                      borderColor: "#b2ebf2",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00C2E0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00C2E0",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    createCardMutation.mutate({
                      boardId: column.boardId,
                      columnId: column._id,
                      title: cardTitle,
                    })
                  }
                  sx={{
                    bgcolor: "#00C2E0",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      bgcolor: "#0099b7",
                    },
                  }}
                >
                  Thêm thẻ
                </Button>
                <Button
                  size="small"
                  onClick={() => setOpenAddCard(false)}
                  sx={{
                    color: "#5e6c84",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#e0f7fa", color: "#00C2E0" },
                  }}
                >
                  Hủy
                </Button>
              </Box>
            </>
          ) : (
            <Button
              startIcon={<AddCardIcon />}
              onClick={() => setOpenAddCard(true)}
              size="small"
              sx={{
                color: "#00C2E0",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mt: 1,
                background: "rgba(0,194,224,0.07)",
                boxShadow: "0 2px 8px 0 #00C2E022",
                transition: "all 0.2s",
                "&:hover": {
                  background: "#e0f7fa",
                  color: "#0099b7",
                  boxShadow: "0 4px 16px 0 #00C2E044",
                  transform: "translateY(-2px) scale(1.04)",
                },
              }}
            >
              Thêm nội dung mới
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
