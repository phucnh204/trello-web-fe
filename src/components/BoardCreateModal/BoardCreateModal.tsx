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
  Fade,
  Paper,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Palette as PaletteIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import axiosClient from "../../apis/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getUserId } from "../../utils/auth";

// Danh sách màu
const BACKGROUND_COLORS = [
  { color: "#00C2E0", name: "Sky Cyan" },
  { color: "#0079BF", name: "Ocean Blue" },

  { color: "#51E898", name: "Mint Green" },
  { color: "#FFAB4A", name: "Amber Orange" },
  { color: "#FF6F61", name: "Coral Red" },
  { color: "#C377E0", name: "Lavender Purple" },
  { color: "#B3BAC5", name: "Cloud Gray" },
  { color: "#344563", name: "Midnight Navy" },
  { color: "#F4F5F7", name: "Paper White" },
  { color: "#6B778C", name: "Slate" },
  { color: "#E4F0F6", name: "Ice Blue" },
  { color: "#F9D6C1", name: "Peach" },
];

// Hàm để kiểm tra độ sáng của màu và trả về màu text phù hợp
// const getContrastColor = (backgroundColor: string): string => {
//   // Chuyển đổi hex sang RGB
//   const hex = backgroundColor.replace("#", "");
//   const r = parseInt(hex.substr(0, 2), 16);
//   const g = parseInt(hex.substr(2, 2), 16);
//   const b = parseInt(hex.substr(4, 2), 16);

//   // Tính độ sáng (luminance)
//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   // Trả về màu trắng cho background tối, màu tối cho background sáng
//   return luminance > 0.5 ? "#2c3e50" : "#ffffff";
// };

// Template suggestions
const BOARD_TEMPLATES = [
  "Dự án phát triển sản phẩm",
  "Kế hoạch marketing",
  "Quản lý nội dung",
  "Roadmap công nghệ",
  "Sprint planning",
  "Quản lý sự kiện",
];

const BoardCreateModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(
    BACKGROUND_COLORS[0].color
  );
  const [isCreating, setIsCreating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const queryClient = useQueryClient();

  const selectedColor = BACKGROUND_COLORS.find(
    (c) => c.color === backgroundColor
  );

  const handleCreate = async () => {
    if (!title.trim()) return;

    setIsCreating(true);
    try {
      const res = await axiosClient.post("/boards", {
        title,
        backgroundColor,
        ownerIds: [getUserId()],
      });

      console.log("✅ Board created:", res.data);
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      enqueueSnackbar("🎉 Tạo bảng thành công!", { variant: "success" });

      handleClose();
    } catch (err) {
      console.error("❌ Lỗi khi tạo board:", err);
      enqueueSnackbar("❌ Không thể tạo bảng. Vui lòng thử lại!", {
        variant: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setBackgroundColor(BACKGROUND_COLORS[0].color);
    setShowTemplates(false);
    onClose();
  };

  const handleTemplateSelect = (template: string) => {
    setTitle(template);
    setShowTemplates(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          width: 480,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header với gradient */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
          p: 3,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <DashboardIcon sx={{ color: "#fff", fontSize: 28 }} />
          <DialogTitle
            sx={{
              color: "#172b4d",
              p: 0,
              fontSize: "1.7rem",
              fontWeight: 700,
              letterSpacing: 0.2,
              mb: 0.5,
              lineHeight: 1.2,
            }}
          >
            Tạo bảng mới
          </DialogTitle>
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3, pt: 2 }}>
        {/* Tiêu đề bảng */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1.5}
            color="#344563"
            sx={{ letterSpacing: 0.1 }}
          >
            Tiêu đề bảng *
          </Typography>
          <TextField
            fullWidth
            placeholder="Nhập tên cho bảng của bạn..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DashboardIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fafafa",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                },
              },
            }}
          />

          {/* Template suggestions */}
          <Box sx={{ mt: 1.5 }}>
            <Button
              size="small"
              onClick={() => setShowTemplates(!showTemplates)}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontSize: "0.85rem",
                p: 0,
                minWidth: "auto",
              }}
            >
              {showTemplates ? "Ẩn" : "Hiện"} gợi ý template
            </Button>

            {showTemplates && (
              <Fade in={showTemplates}>
                <Box
                  sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.8 }}
                >
                  {BOARD_TEMPLATES.map((template, index) => (
                    <Chip
                      key={index}
                      label={template}
                      size="small"
                      onClick={() => handleTemplateSelect(template)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: backgroundColor + "22",
                          color: backgroundColor,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Fade>
            )}
          </Box>
        </Box>

        {/* Chọn màu nền */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <PaletteIcon color="action" />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              Chọn màu nền
            </Typography>
          </Box>

          <Typography variant="body2" color="#6b778c" mb={2}>
            Màu hiện tại:{" "}
            <strong style={{ color: backgroundColor }}>
              {selectedColor?.name}
            </strong>
          </Typography>

          <Grid container spacing={1.5}>
            {BACKGROUND_COLORS.map(({ color, name }) => (
              <Grid item xs={3} key={color}>
                <Paper
                  onClick={() => setBackgroundColor(color)}
                  elevation={backgroundColor === color ? 4 : 1}
                  sx={{
                    bgcolor: color,
                    width: "100%",
                    height: 50,
                    borderRadius: 2,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease",
                    transform:
                      backgroundColor === color ? "scale(1.05)" : "scale(1)",
                    border:
                      backgroundColor === color ? "3px solid #fff" : "none",
                    boxShadow:
                      backgroundColor === color
                        ? `0 0 0 2px ${color}, 0 4px 12px ${color}44`
                        : "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 4px 16px ${color}66`,
                    },
                  }}
                >
                  {backgroundColor === color && (
                    <CheckIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontSize: 20,
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                      }}
                    />
                  )}
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    mt: 0.5,
                    fontSize: "0.7rem",
                    color: backgroundColor === color ? color : "text.secondary",
                    fontWeight: backgroundColor === color ? 600 : 400,
                  }}
                >
                  {name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            px: 3,
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={!title.trim() || isCreating}
          onClick={handleCreate}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: 2,
            backgroundColor: backgroundColor,
            color: ["#F4F5F7", "#E4F0F6", "#B3BAC5", "#FFFFFF"].includes(
              backgroundColor
            )
              ? "#172b4d"
              : "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            "&:hover": {
              backgroundColor:
                backgroundColor === "#FFFFFF"
                  ? "#f5f5f5"
                  : backgroundColor + "dd",
            },
            "&:disabled": {
              backgroundColor: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          {isCreating ? "Đang tạo..." : "Tạo bảng"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardCreateModal;
