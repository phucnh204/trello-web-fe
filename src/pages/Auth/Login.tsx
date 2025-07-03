import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { Box, Paper, Typography, Avatar, Fade, Alert } from "@mui/material";
import { saveToken, saveUserInfo } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import WelcomeModal from "../../components/WelcomeModal/WelcomeModal";

// import { logo } from "@/assets/public/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [logoHover, setLogoHover] = useState(false);
  const logo = "./../src/assets/logo.png";
  const handleLoginSuccess = useCallback(async (credentialResponse: any) => {
    try {
      setErrorMsg(null);
      const token = credentialResponse.credential;

      if (token) {
        // const decoded = jwtDecode(token);

        const response = await axiosClient.post("/auth/google", { token });
        saveToken(response.data.accessToken);
        saveUserInfo(response.data.user);

        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại.");
      console.error("Login error:", error);
    }
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background:
          "linear-gradient(120deg, #e0f7fa 0%, #b2ebf2 50%, #f4f5f7 100%)",
        transition: "background 0.5s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/*  */}
      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 600,
          top: -120,
          left: -120,
          background: "radial-gradient(circle, #00C2E0 0%, transparent 70%)",
          opacity: 0.18,
          zIndex: 0,
          filter: "blur(12px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          bottom: -80,
          right: -80,
          background: "radial-gradient(circle, #1976d2 0%, transparent 70%)",
          opacity: 0.12,
          zIndex: 0,
          filter: "blur(16px)",
        }}
      />
      <WelcomeModal />
      <Fade in timeout={600}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, sm: 5 },
            minWidth: { xs: 320, sm: 380 },
            maxWidth: 420,
            borderRadius: 5,
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba(0,194,224,0.18)",
            background: "rgba(255,255,255,0.97)",
            transition: "box-shadow 0.3s, transform 0.2s",
            position: "relative",
            zIndex: 1,
            "&:hover": {
              boxShadow: "0 16px 48px 0 rgba(0,194,224,0.22)",
              transform: "translateY(-2px) scale(1.01)",
            },
          }}
        >
          {/* Logo và thương hiệu */}
          <Box
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              transition: "transform 0.3s",
              transform: logoHover ? "scale(1.13) rotate(-8deg)" : "scale(1)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <Avatar
              src={logo}
              alt="Trello Logo"
              sx={{
                width: 68,
                height: 68,
                boxShadow: logoHover
                  ? "0 6px 32px 0 #00C2E055"
                  : "0 2px 12px 0 #00C2E022",
                transition: "all 0.3s",
                bgcolor: "#fff",
                border: "2.5px solid #00C2E0",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            fontWeight={800}
            mb={0.5}
            color="#1976d2"
            sx={{
              letterSpacing: 0.7,
              textShadow: "0 1px 0 #fff, 0 2px 8px #00C2E022",
              fontSize: { xs: 22, sm: 26 },
            }}
          >
            Đăng nhập
          </Typography>
          <Typography color="text.secondary" mb={2.5} sx={{ fontSize: 17 }}>
            Quản lý công việc hiệu quả cùng{" "}
            <span style={{ color: "#00C2E0", fontWeight: 700 }}>
              Task Online
            </span>
          </Typography>
          {/* Hướng dẫn sử dụng */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#0288d1",
              fontSize: 15,
              fontWeight: 500,
              opacity: 0.92,
            }}
          >
            <span role="img" aria-label="info">
              💡
            </span>
            Đăng nhập bằng Google để bắt đầu sử dụng!
          </Box>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, fontSize: 15 }}>
              {errorMsg}
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
              "& > div": {
                boxShadow: "0 2px 12px 0 #00C2E033",
                borderRadius: 2.5,
                transition: "box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                  boxShadow: "0 6px 24px 0 #00C2E055",
                  transform: "scale(1.04)",
                },
                minWidth: 220,
                minHeight: 48,
                background: "#fff",
              },
            }}
          >
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại.");
                console.log("Login Failed");
              }}
              theme="outline"
              size="large"
              shape="pill"
              text="signin_with"
              width="100%"
            />
          </Box>
          {/* Footer nhỏ */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 3,
              color: "#90a4ae",
              fontSize: 13,
              letterSpacing: 0.2,
            }}
          >
            © {new Date().getFullYear()} Task Online. All rights reserved.
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}
