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
import { blue } from "@mui/material/colors";
// import Starred from "./Menus/Starred";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import { DashboardIcon } from '@mui/icons-material/Dashboard';
// import { DashboardIcon } from "@mui/icons-material/Dashboard;

function AppBar() {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  // const MENU_STYLE = {
  //   color: "primary.main",
  //   bgcolor: "white",
  //   border: "none",
  //   px: "5px",
  //   borderRadius: "3px",
  //   "& .MuiSvgIcon-root": {
  //     color: "primary.main",
  //   },
  //   "&:hover": {
  //     bgcolor: "primary.50",
  //   },
  // };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 2,
        boxShadow:
          theme.palette.mode === "light"
            ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
            : "0px 2px 4px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Logo & Menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          className="trello-logo"
          src="https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/pulse-nhip-song-khoe/song-khoe/2022/cach-xac-dinh-va-lap-ke-hoach-hoan-thanh-muc-tieu-ca-nhan-1200x800-3.jpg"
          alt="Trello"
          style={{
            width: "90px",
            height: "50px",
            marginLeft: 5,
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <span
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: blue[700] }}
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              sx={{ color: textColor, cursor: "pointer" }}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: textColor, cursor: "pointer" }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
