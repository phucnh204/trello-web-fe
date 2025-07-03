import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardComponentProps } from "./type";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardAPI } from "../../../../../../../apis/card.api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Card: React.FC<CardComponentProps> = ({ card }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const queryClient = useQueryClient();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const deleteCardMutation = useMutation({
    mutationFn: () => cardAPI.deleteCard(card._id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    deleteCardMutation.mutate();
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: { ...card },
  });

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  const shouldShowCardActiopns = () => {
    return (
      !!card?.memberIds.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  const updateCardMutation = useMutation({
    mutationFn: (data: { title: string }) => cardAPI.updateCard(card._id, data),
    onSuccess: () => {
      // Cập nhật cache columns/cards
      queryClient.invalidateQueries();
    },
  });

  const handleSaveTitle = () => {
    if (title.trim() && title !== card.title) {
      updateCardMutation.mutate({ title });
    }
    setIsEditing(false);
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...listeners}
      {...attributes}
      sx={{
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 2px 12px 0 #00C2E022",
        overflow: "unset",
        display: card?.FE_PlacehoderCard ? "none" : " block",
        borderRadius: 4,
        px: 1.5,
        py: 1,
        fontSize: 15,
        background: "linear-gradient(120deg, #f4f6fa 60%, #e0f7fa 100%)",
        border: "1.5px solid #e0f7fa",
        transition: "box-shadow 0.18s, border 0.18s, background 0.18s",
        "&:hover": {
          boxShadow: "0 6px 24px 0 #00C2E044",
          border: "1.5px solid #00C2E0",
          background: "linear-gradient(120deg, #e0f7fa 60%, #f4f6fa 100%)",
        },
      }}
    >
      {card?.cover && (
        <CardMedia sx={{ height: 120, borderRadius: 3 }} image={card?.cover} />
      )}

      <CardContent sx={{ pb: 1, pt: 1 }}>
        {isEditing ? (
          <TextField
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTitle();
              if (e.key === "Escape") {
                setTitle(card.title);
                setIsEditing(false);
              }
            }}
            sx={{
              fontWeight: 600,
              fontSize: 15,
              width: "100%",
              border: "1.5px solid #00C2E0",
              borderRadius: 6,
              outline: "none",
              padding: "7px 10px",
              background: "#f4f6fa",
              boxSizing: "border-box",
              marginBottom: 2,
              color: "#1565c0",
              transition: "border 0.18s",
              boxShadow: "0 1px 4px #00C2E022",
            }}
            maxLength={100}
          />
        ) : (
          <Typography
            onClick={() => setIsEditing(true)}
            sx={{
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              px: 1,
              pt: 0.5,
              borderRadius: 2,
              transition: "background 0.18s, color 0.18s",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              color: "#1976d2",
              background: "transparent",
              "&:hover": {
                background: "#e0f7fa",
                color: "#0099b7",
              },
            }}
            title={title}
          >
            {title}
          </Typography>
        )}
      </CardContent>

      {shouldShowCardActiopns() && (
        <CardActions
          sx={{
            p: "0 4px 8px 4px",
            gap: 1,
            "& .MuiButton-root": {
              minWidth: 32,
              color: "#00C2E0",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 2,
              px: 1,
              background: "rgba(0,194,224,0.06)",
              transition: "background 0.18s, color 0.18s",
              "&:hover": {
                background: "#e0f7fa",
                color: "#0099b7",
              },
            },
          }}
        >
          {!!card?.memberIds.length && (
            <Button size="small" startIcon={<GroupOutlinedIcon />}>
              {card?.memberIds.length}
            </Button>
          )}

          {!!card?.comments.length && (
            <Button size="small" startIcon={<ReviewsIcon />}>
              {card?.comments.length}
            </Button>
          )}

          {!!card?.attachments.length && (
            <Button size="small" startIcon={<AddLinkIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}

      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 2,
          color: "#e53935",
          background: "#fff",
          borderRadius: 2,
          transition: "background 0.18s, color 0.18s",
          "&:hover": {
            background: "#ffebee",
            color: "#b71c1c",
          },
        }}
        onClick={handleDelete}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>

      {/* Dialog xác nhận xoá */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle sx={{ fontWeight: 700, color: "#e53935" }}>
          Bạn có chắc muốn xoá thẻ này không?
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
            Huỷ
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              color: "#e53935",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#ffebee",
                color: "#b71c1c",
              },
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </MuiCard>
  );
};

export default Card;
