import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import ModeSelect from "../ModeSelect/ModeSelect";
import "./style.css";
// import Workspace from "./Menus/Workspace";
// import Recent from "./Menus/Recent";
// import Templates from "./Menus/Templates";
import { Badge, Tooltip, useTheme } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
// import Starred from "./Menus/Starred";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import { DashboardIcon } from '@mui/icons-material/Dashboard';
// import { DashboardIcon } from "@mui/icons-material/Dashboard;
import { useState } from "react";

function AppBar() {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const logo = "./../src/assets/logo.png";
  const [logoHover, setLogoHover] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: { xs: "48px", md: "55px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: { xs: 1, md: 2 },
        boxShadow:
          theme.palette.mode === "light"
            ? "0px 2px 8px rgba(0, 194, 224, 0.08)"
            : "0px 2px 8px rgba(0, 194, 224, 0.18)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Logo & Menu */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
      >
        <img
          className="trello-logo"
          src={logo}
          alt="Trello"
          style={{
            width: "90px",
            height: "50px",
            marginLeft: 5,
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: logoHover
              ? "0 4px 24px 0 #00C2E055"
              : "0 2px 8px 0 #00C2E022",
            transition: "all 0.3s",
            cursor: "pointer",
            transform: logoHover ? "scale(1.06) rotate(-3deg)" : "scale(1)",
          }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <span
            style={{
              fontSize: "1.7rem",
              fontWeight: 900,
              color: "#00C2E0",
              letterSpacing: 1,
              textShadow: "0 2px 8px #00C2E044",
              transition: "color 0.2s",
            }}
          >
            Task Online
          </span>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {/* <Workspace />
          <Recent />
          <Starred />
          <Templates /> */}
          {/* <Chip
            sx={MENU_STYLE}
            // icon={<DashboardIcon />}
            label="Kế hoạch của bạn"
            onClick={() => {}}
          /> */}
          {/* <Button
            variant="outlined"
            startIcon={<CreateNewFolderIcon />}
            sx={{ color: textColor, borderColor: textColor }}
          >
            Create
          </Button> */}
        </Box>
      </Box>

      {/* Search & Icons */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
      >
        {/* <TextField
          id="search-bar"
          placeholder="Search..."
          variant="outlined"
          size="small"
          sx={{
            minWidth: "350px",
            background:
              theme.palette.mode === "light"
                ? "#FFFFFF"
                : "rgba(255, 255, 255, 0.1)",
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              color: textColor, // Đổi màu chữ trong input
            },
            "& .MuiInputLabel-root": {
              color: textColor, // Đổi màu label của input
            },
          }}
        /> */}

        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot">
            <NotificationsNoneIcon
              sx={{
                color: textColor,
                cursor: "pointer",
                fontSize: 28,
                transition: "color 0.2s, transform 0.2s",
                "&:hover": {
                  color: "#00C2E0",
                  transform: "scale(1.15) rotate(-8deg)",
                  textShadow: "0 2px 8px #00C2E044",
                },
              }}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon
            sx={{
              color: textColor,
              cursor: "pointer",
              fontSize: 26,
              transition: "color 0.2s, transform 0.2s",
              "&:hover": {
                color: "#00C2E0",
                transform: "scale(1.12) rotate(8deg)",
                textShadow: "0 2px 8px #00C2E044",
              },
            }}
          />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
