import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Fade,
} from "@mui/material";

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 5,
          boxShadow: "0 8px 40px 0 #00C2E044",
          background: "linear-gradient(120deg, #e0f7fa 0%, #fff 100%)",
          p: 0,
          zIndex: 2000,
          overflow: "visible",
          position: "relative",
        },
      }}
    >
      {/* Slice effect at the top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 48,
          zIndex: 20,
          pointerEvents: "none",
          background: "transparent",
        }}
      >
        <svg
          width="100%"
          height="48"
          viewBox="0 0 600 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <polygon
            points="0,0 600,0 600,32 0,48"
            fill="#00C2E0"
            opacity="0.13"
          />
          <polygon
            points="0,0 600,0 600,18 0,38"
            fill="#1976d2"
            opacity="0.09"
          />
        </svg>
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: -60,
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        {/* Illustration: Trello-style board */}
        <Box
          sx={{
            width: 110,
            height: 70,
            background: "linear-gradient(120deg, #00C2E0 60%, #1976d2 100%)",
            borderRadius: 3,
            boxShadow: "0 4px 24px #00C2E044",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mb: 1,
            animation: "float 2.5s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        >
          {/* Columns */}
          <Box
            sx={{
              width: 18,
              height: 48,
              background: "#fff",
              borderRadius: 1,
              mx: 0.5,
              boxShadow: "0 2px 8px #00C2E022",
              display: "inline-block",
            }}
          />
          <Box
            sx={{
              width: 18,
              height: 60,
              background: "#b2ebf2",
              borderRadius: 1,
              mx: 0.5,
              boxShadow: "0 2px 8px #00C2E022",
              display: "inline-block",
            }}
          />
          <Box
            sx={{
              width: 18,
              height: 40,
              background: "#e3f2fd",
              borderRadius: 1,
              mx: 0.5,
              boxShadow: "0 2px 8px #00C2E022",
              display: "inline-block",
            }}
          />
        </Box>
      </Box>
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 8,
          pb: 1,
          fontWeight: 900,
          fontSize: 26,
          color: "#1976d2",
          letterSpacing: 0.5,
          background: "linear-gradient(90deg, #e3f2fd 60%, #b2ebf2 100%)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "relative",
          // Add slice shadow
          boxShadow: "0 -8px 32px 0 #00C2E022 inset",
        }}
      >
        <span
          style={{
            fontSize: 32,
            marginBottom: 4,
            display: "inline-block",
            filter: "drop-shadow(0 2px 8px #00C2E022)",
          }}
        >
          🚀
        </span>
        Chào mừng bạn đến với{" "}
        <span style={{ color: "#00C2E0" }}>Task Online</span>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 2, sm: 5 },
          pt: 2,
          pb: 1,
          textAlign: "center",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: 19,
            color: "#0288d1",
            mb: 2,
            letterSpacing: 0.2,
          }}
        >
          Tổ chức công việc, học tập hiệu quả như Trello!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.2,
            mb: 2,
            mx: "auto",
            maxWidth: 400,
          }}
        >
          <Typography
            sx={{
              fontSize: 16.5,
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span
              style={{
                color: "#00C2E0",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              🗂️
            </span>
            Tạo board cho từng mục tiêu (học, dự án, công việc)
          </Typography>
          <Typography
            sx={{
              fontSize: 16.5,
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span
              style={{
                color: "#00C2E0",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              ↔️
            </span>
            Kéo thả cột, thẻ linh hoạt, sắp xếp thông minh
          </Typography>
          <Typography
            sx={{
              fontSize: 16.5,
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span
              style={{
                color: "#00C2E0",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              🔄
            </span>
            Đồng bộ hóa dữ liệu qua Google
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 14.5,
            color: "#789",
            mb: 1,
            opacity: 0.9,
            fontStyle: "italic",
          }}
        >
          Đăng nhập bằng Google để bắt đầu trải nghiệm!
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          pb: 3.5,
          pt: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            px: 5,
            py: 1.4,
            borderRadius: 3,
            fontWeight: 800,
            fontSize: 18,
            background: "linear-gradient(90deg, #00C2E0 30%, #1976d2 100%)",
            boxShadow: "0 2px 16px 0 #00C2E055",
            textTransform: "none",
            letterSpacing: 0.5,
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1976d2 10%, #00C2E0 90%)",
              boxShadow: "0 4px 32px 0 #00C2E077",
              transform: "scale(1.04)",
            },
          }}
        >
          Bắt đầu ngay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
