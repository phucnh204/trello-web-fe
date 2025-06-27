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
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: "80vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
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
            bgcolor: "white",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#000",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
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
                style: { fontWeight: "bold", fontSize: 16 },
                maxLength: 50,
              }}
            />
          ) : (
            <Typography
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setIsEditingTitle(true)}
            >
              {newTitle}
            </Typography>
          )}

          <Box>
            <Tooltip title="More options">
              <Button
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
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
            >
              <MenuItem onClick={handleDeleteColumn}>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Xóa cột</ListItemText>
              </MenuItem>
              <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
                <DialogTitle>Bạn có chắc muốn xóa cột này không?</DialogTitle>
                <DialogActions>
                  <Button onClick={handleCancelDelete}>Hủy</Button>
                  <Button
                    onClick={handleConfirmDelete}
                    // color="red"
                    variant="outlined"
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
        <Box sx={{ px: 2, width: "100%" }}>
          {openAddCard ? (
            <>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tiêu đề..."
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
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
                >
                  Thêm thẻ
                </Button>
                <Button size="small" onClick={() => setOpenAddCard(false)}>
                  Hủy
                </Button>
              </Box>
            </>
          ) : (
            <Button
              startIcon={<AddCardIcon />}
              onClick={() => setOpenAddCard(true)}
              size="small"
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
