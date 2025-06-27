import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
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
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
        display: card?.FE_PlacehoderCard ? "none" : " block",
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

      <CardContent>
        {isEditing ? (
          <input
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
            style={{
              fontWeight: "bold",
              fontSize: 16,
              width: "100%",
              border: "1px solid #1976d2",
              borderRadius: 4,
              outline: "none",
              padding: "6px 8px",
              background: "#fff",
              boxSizing: "border-box",
            }}
            maxLength={100}
          />
        ) : (
          <Typography
            onClick={() => setIsEditing(true)}
            sx={{
              // display: "flex",
              // justifyContent: "start",
              // alignItems: "center",
              fontSize: 16,
              fontWeight: "bold",
              cursor: "pointer",
              px: 1,
              pt: 1,
              borderRadius: "4px",
              transition: "background 0.2s",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              "&:hover": {
                background: "#f4f5f7",
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
        sx={{ position: "absolute", top: 4, right: 4, zIndex: 2 }}
        onClick={handleDelete}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>

      {/* Dialog xác nhận xoá */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Bạn có chắc muốn xoá thẻ này không?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Huỷ</Button>
          <Button
            onClick={handleConfirmDelete}
            // color="warning"
            // variant="contained"
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </MuiCard>
  );
};

export default Card;
