import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import axiosClient from "../../apis/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

// Danh sách màu nền gợi ý
const BACKGROUND_COLORS = [
  "#0079BF",
  "#D29034",
  "#519839",
  "#B04632",
  "#89609E",
  "#CD5A91",
];

const BoardCreateModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);
  const queryClient = useQueryClient();
  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      const res = await axiosClient.post("/boards", {
        title,
        backgroundColor,
      });
        console.log("✅ Board created:", res.data);
        
        queryClient.invalidateQueries({ queryKey: ["boards"] }); // Cập nhật danh sách boards
        
        enqueueSnackbar("Thêm kế hoạch thành công!", { variant: "success" }); // Thông báo thành công
      onClose();
      setTitle(""); // Reset sau khi tạo
    } catch (err) {
        console.error("❌ Lỗi khi tạo board:", err);
        enqueueSnackbar("❌ Tạo bảng thất bại!", { variant: "error" });// Thông báo lỗi
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400, borderRadius: 3, overflow: "hidden" },
      }}
    >
      <Box sx={{ bgcolor: backgroundColor, p: 2, position: "relative" }}>
        <DialogTitle sx={{ color: "#fff", pl: 0 }}>Tạo bảng mới</DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 1 }}>
        <Typography variant="body2" mb={1}>
          Tiêu đề bảng
        </Typography>
        <TextField
          fullWidth
          placeholder="Ví dụ: Dự án thiết kế UI"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
        />

        <Typography variant="body2" mt={2} mb={1}>
          Chọn màu nền
        </Typography>
        <Grid container spacing={1}>
          {BACKGROUND_COLORS.map((color) => (
            <Grid item xs={2.4} key={color}>
              <Box
                onClick={() => setBackgroundColor(color)}
                sx={{
                  bgcolor: color,
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  cursor: "pointer",
                  outline:
                    backgroundColor === color ? "2px solid black" : "none",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          //   variant="contained"
          fullWidth
          disabled={!title.trim()}
          onClick={handleCreate}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: 2,
            bgcolor: "#fff",
            color: "#",
          }}
        >
          Tạo bảng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardCreateModal;
