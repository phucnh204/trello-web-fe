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
          gap: { xs: 1, md: 2 },
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
            minWidth: { xs: "160px", sm: "180px", md: "200px" },
            maxWidth: { xs: "180px", sm: "200px" },
            mx: { xs: 1, sm: 2 },
            borderRadius: "10px",
            height: "fit-content",
            bgcolor: "rgba(0,194,224,0.07)",
            mt: 1.5,
            boxShadow: "0 2px 8px 0 #00C2E022",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "box-shadow 0.2s, background 0.2s",
            "&:hover": {
              bgcolor: "rgba(0,194,224,0.13)",
              boxShadow: "0 4px 16px 0 #00C2E044",
            },
          }}
        >
          <Button
            sx={{
              color: "#00C2E0",
              width: "100%",
              py: 1.2,
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 2,
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 2px 8px 0 #00C2E022",
              textTransform: "none",
              transition: "all 0.2s",
              "&:hover": {
                background: "#e0f7fa",
                color: "#0099b7",
                boxShadow: "0 4px 16px 0 #00C2E044",
                transform: "translateY(-2px) scale(1.04)",
              },
            }}
            startIcon={<AddToDriveIcon sx={{ color: "#00C2E0" }} />}
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
              borderRadius: 3,
              boxShadow: "0 8px 28px rgba(0,194,224,0.18)",
              minWidth: { xs: 260, sm: 320, md: 380 },
              bgcolor: "#f4f5f7",
              p: 2,
              transition: "box-shadow 0.2s",
              border: "2px solid #00C2E0",
              background: "linear-gradient(135deg, #e0f7fa 0%, #f4f6fa 100%)",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 900,
              fontSize: 21,
              color: "#00C2E0",
              pb: 0,
              bgcolor: "transparent",
              letterSpacing: 0.7,
              textAlign: "center",
              textShadow: "0 2px 8px #00C2E044",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AddIcon sx={{ color: "#00C2E0", fontSize: 28, mb: "2px" }} />
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
                bgcolor: "#fff",
                borderRadius: 2,
                mt: 2,
                mb: 1,
                boxShadow: "0 2px 8px #00C2E022",
                "& .MuiOutlinedInput-root": {
                  fontSize: 16,
                  padding: "10px 12px",
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
              inputProps={{ maxLength: 50 }}
            />
          </DialogContent>

          <DialogActions
            sx={{
              px: 2,
              pb: 1.5,
              justifyContent: "space-between",
              mt: 1,
              borderTop: "1px solid #e0f7fa",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "#5e6c84",
                fontWeight: 600,
                textTransform: "none",
                fontSize: 15,
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  bgcolor: "#e0f7fa",
                  color: "#00C2E0",
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
                bgcolor: "#00C2E0",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                textTransform: "none",
                boxShadow: "0 2px 8px #00C2E022",
                borderRadius: 2,
                px: 3,
                py: 1,
                transition: "background 0.2s, box-shadow 0.2s",
                "&:hover": {
                  bgcolor: "#0099b7",
                  boxShadow: "0 4px 16px #00C2E044",
                },
                "&:disabled": {
                  bgcolor: "#b2ebf2",
                  color: "#90a4ae",
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
