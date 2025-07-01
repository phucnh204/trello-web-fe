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
  CircularProgress,
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
import { BACKGROUND_COLORS, BOARD_TEMPLATES } from "./listConfig";

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
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const selectedColor = BACKGROUND_COLORS.find(
    (c) => c.color === backgroundColor
  );

  // Khi tạo board, lấy màu chính từ gradient để lưu (nếu BE chỉ nhận màu đơn, lấy màu đầu)
  const getMainColor = (gradient: string) => {
    const match = gradient.match(/#([0-9a-fA-F]{6})/);
    return match ? `#${match[1]}` : "#00C2E0";
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bảng!");
      return;
    }
    setError(null);
    setIsCreating(true);
    try {
      const res = await axiosClient.post("/boards", {
        title,
        backgroundColor: getMainColor(backgroundColor),
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
          background: "#fff",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 24px 80px rgba(0,194,224,0.18)",
          },
        },
      }}
    >
      {/* Header với gradient hoặc màu trắng */}
      <Box
        sx={{
          background:
            backgroundColor === "#fff"
              ? "#fff"
              : `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
          p: 3,
          position: "relative",
          "&::before":
            backgroundColor === "#fff"
              ? undefined
              : {
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
          <DashboardIcon
            sx={{
              color: "blue",
              fontSize: 32,
              filter: "drop-shadow(0 2px 8px #0002)",
            }}
          />
          <DialogTitle
            sx={{
              color: "#172b4d",
              p: 0,
              fontSize: "1.7rem",
              fontWeight: 700,
              letterSpacing: 0.2,
              mb: 0.5,
              lineHeight: 1.2,
              textShadow: "0 2px 8px #fff8",
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
              transform: "scale(1.1) rotate(8deg)",
              boxShadow: "0 2px 8px #fff8",
            },
            transition: "all 0.2s",
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
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
            variant="outlined"
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DashboardIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                fontWeight: 600,
                fontSize: 17,
              },
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
                  boxShadow: "0 2px 8px 0 #00C2E022",
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
                fontWeight: 600,
                "&:hover": {
                  color: backgroundColor,
                  textDecoration: "underline",
                },
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
                        fontWeight: 600,
                        background: "#f4f6fa",
                        color: "#344563",
                        border: `1px solid ${backgroundColor}33`,
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: backgroundColor + "22",
                          color: backgroundColor,
                          border: `1.5px solid ${backgroundColor}`,
                          transform: "scale(1.08)",
                          boxShadow: `0 2px 8px ${backgroundColor}33`,
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
            <strong style={{ color: "#222" }}>{selectedColor?.name}</strong>
          </Typography>

          <Grid container spacing={1.5}>
            {BACKGROUND_COLORS.map(({ color, name }) => (
              <Grid item xs={4} key={color}>
                <Paper
                  onClick={() => setBackgroundColor(color)}
                  elevation={backgroundColor === color ? 6 : 1}
                  sx={{
                    background: color,
                    width: "100%",
                    height: 50,
                    borderRadius: 2,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease",
                    transform:
                      backgroundColor === color ? "scale(1.08)" : "scale(1)",
                    border:
                      backgroundColor === color ? "3px solid #fff" : "none",
                    boxShadow:
                      backgroundColor === color
                        ? `0 0 0 2px #00C2E0, 0 4px 16px #00C2E055`
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: `0 4px 16px #00C2E066`,
                      zIndex: 2,
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        fontSize: 22,
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
                    color:
                      backgroundColor === color ? "#00C2E0" : "text.secondary",
                    fontWeight: backgroundColor === color ? 700 : 400,
                    letterSpacing: 0.2,
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
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": {
              background: "#f4f6fa",
            },
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
            fontWeight: 700,
            px: 4,
            py: 1,
            borderRadius: 2,
            background: backgroundColor,
            color: backgroundColor === "#fff" ? "#172b4d" : "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
            "&:hover": {
              background:
                backgroundColor === "#fff" ? "#f5f5f5" : backgroundColor + "dd",
              color: backgroundColor === "#fff" ? "#172b4d" : "#fff",
              transform: "scale(1.04) translateY(-2px)",
              boxShadow: `0 4px 16px #00C2E044`,
            },
            "&:disabled": {
              backgroundColor: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          {isCreating ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Đang tạo...
            </Box>
          ) : (
            "Tạo bảng"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardCreateModal;
