import { Box, Button, Typography, Paper, Fade } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { getUserId } from "../../utils/auth";
import axiosClient from "../../apis/axiosClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NoBoard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [iconHover, setIconHover] = useState(false);

  const handleCreateBoard = async () => {
    const userId = getUserId();
    if (!userId) return alert("Chưa đăng nhập");

    try {
      setLoading(true);
      const res = await axiosClient.post("/boards", {
        title: "Bảng đầu tiên của tôi",
        ownerIds: [userId],
        memberIds: [],
        columnOrderIds: [],
      });

      const newBoardId = res.data._id;
      navigate(`/boards/${newBoardId}`);
    } catch (err) {
      console.error("Lỗi khi tạo bảng:", err);
      alert("Không thể tạo bảng mới. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="linear-gradient(135deg, #e0f7fa 0%, #f4f6fa 100%)"
      sx={{
        transition: "background 0.5s",
      }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 5,
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 8px 32px 0 rgba(0,194,224,0.18)",
            background: "rgba(255,255,255,0.95)",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 12px 40px 0 rgba(0,194,224,0.22)",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
            onMouseEnter={() => setIconHover(true)}
            onMouseLeave={() => setIconHover(false)}
            sx={{
              transition: "transform 0.3s",
              transform: iconHover ? "scale(1.12) rotate(-8deg)" : "scale(1)",
              cursor: "pointer",
            }}
          >
            <AddToPhotosIcon
              sx={{
                fontSize: 70,
                color: iconHover ? "#0099b7" : "#00C2E0",
                filter: iconHover
                  ? "drop-shadow(0 2px 12px #00C2E055)"
                  : "none",
                transition: "all 0.3s",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            fontWeight={700}
            mb={1}
            color="#222"
            sx={{
              letterSpacing: 0.5,
              textShadow: "0 1px 0 #fff",
            }}
          >
            Bạn chưa có bảng nào
          </Typography>
          <Typography color="text.secondary" mb={3} sx={{ fontSize: 17 }}>
            Hãy bắt đầu bằng việc tạo bảng đầu tiên để quản lý công việc hiệu
            quả hơn!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddToPhotosIcon />}
            sx={{
              borderRadius: 3,
              px: 5,
              fontWeight: 700,
              textTransform: "none",
              fontSize: 18,
              boxShadow: "0 4px 20px 0 rgba(0,194,224,0.15)",
              background: "linear-gradient(90deg, #00C2E0 60%, #0099b7 100%)",
              transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #0099b7 60%, #00C2E0 100%)",
                boxShadow: "0 8px 32px 0 rgba(0,194,224,0.22)",
                transform: "translateY(-2px) scale(1.04)",
              },
              "&:active": {
                background: "#00b3d6",
              },
            }}
            onClick={handleCreateBoard}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo bảng đầu tiên"}
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default NoBoard;
