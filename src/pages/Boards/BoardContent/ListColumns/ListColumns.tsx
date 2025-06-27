import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Column from "./Column/Column";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnsProps } from "./type";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { columnAPI } from "../../../../apis/column.api";
// import { IColumn } from "./Column/type";

const ListColumns: React.FC<ColumnsProps> = ({
  columns,
  boardId,
  onColumnAdded,
  onColumnTitleUpdated,
  onColumnDeleted,
  onCardAdded,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // Thêm column mới
  const addColumnMutation = useMutation({
    mutationFn: (data: { boardId: string; title: string }) =>
      columnAPI.createColumn(data),
    onSuccess: (newColumn) => {
      if (onColumnAdded) onColumnAdded(newColumn);

      // Invalidate queries để refetch data
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });

      setOpen(false);
      setTitle("");
    },
  });

  // Xử lý khi column bị xóa
  // const handleColumnDeleted = (deletedColumnId: string) => {
  //   // Cập nhật cache ngay lập tức để UI phản hồi nhanh
  //   queryClient.setQueryData<IColumn[]>(["columns", boardId], (oldData) => {
  //     if (!oldData) return oldData;
  //     return oldData.filter((col) => col._id !== deletedColumnId);
  //   });

  //   // Invalidate queries để đảm bảo data đồng bộ với backend
  //   queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
  // };

  const handleAddColumn = () => {
    if (!title.trim()) return;
    addColumnMutation.mutate({ boardId, title });
  };

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {columns?.map((column) => {
          return (
            <Column
              key={column._id}
              column={column}
              onColumnTitleUpdated={onColumnTitleUpdated}
              // onColumnDeleted={handleColumnDeleted}
              onColumnDeleted={onColumnDeleted}
              onCardAdded={onCardAdded}
            />
          );
        })}

        {/* Box add new column */}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            bgcolor: "#ffffff3d",
            mt: 1.5,
          }}
        >
          <Button
            sx={{
              color: "white",
              width: "100%",
              py: 1,
            }}
            startIcon={<AddToDriveIcon />}
            onClick={() => setOpen(true)}
          >
            Thêm nội dung
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2.5,
              boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
              minWidth: 380,
              bgcolor: "#f4f5f7",
              p: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "#172b4d",
              pb: 0,
              bgcolor: "transparent",
            }}
          >
            Thêm cột mới
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <TextField
              autoFocus
              fullWidth
              placeholder="Ví dụ: Việc cần làm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                mt: 2,
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  fontSize: 15,
                  padding: "10px 12px",
                  "& fieldset": {
                    borderColor: "#dfe1e6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#a5adba",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#388bff",
                    borderWidth: "2px",
                  },
                },
              }}
              inputProps={{ maxLength: 50 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 2, pb: 1.5 }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "#5e6c84",
                fontWeight: 500,
                textTransform: "none",
                fontSize: 14,
                "&:hover": {
                  bgcolor: "#091e420a",
                },
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleAddColumn}
              disabled={!title.trim() || addColumnMutation.isPending}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#0c66e4",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                textTransform: "none",
                boxShadow: "none",
                borderRadius: 1.5,
                px: 2.5,
                py: 1,
                "&:hover": {
                  bgcolor: "#0055cc",
                },
              }}
            >
              {addColumnMutation.isPending ? "Đang thêm..." : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
