import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Box, Paper, Typography, Avatar, Fade, Alert } from "@mui/material";
import { saveToken, saveUserInfo } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axiosClient from "../../apis/axiosClient";
import { logo } from "@/assets/public/logo.png";

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
      bgcolor="linear-gradient(135deg, #e0f7fa 0%, #f4f5f7 100%)"
      sx={{ transition: "background 0.5s" }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            minWidth: 340,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba(0,194,224,0.18)",
            background: "rgba(255,255,255,0.97)",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 12px 40px 0 rgba(0,194,224,0.22)",
            },
          }}
        >
          <Box
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              transition: "transform 0.3s",
              transform: logoHover ? "scale(1.12) rotate(-8deg)" : "scale(1)",
              cursor: "pointer",
            }}
          >
            <Avatar
              src={logo}
              alt="Trello Logo"
              sx={{
                width: 64,
                height: 64,
                boxShadow: logoHover
                  ? "0 4px 24px 0 #00C2E055"
                  : "0 2px 8px 0 #00C2E022",
                transition: "all 0.3s",
                bgcolor: "#fff",
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
            Đăng nhập
          </Typography>
          <Typography color="text.secondary" mb={3} sx={{ fontSize: 17 }}>
            Quản lý công việc hiệu quả cùng{" "}
            <span style={{ color: "#00C2E0", fontWeight: 600 }}>
              Task Online
            </span>
          </Typography>
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
                borderRadius: 2,
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 24px 0 #00C2E055",
                },
              },
            }}
          >
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại.");
                console.log("Login Failed");
              }}
            />
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
