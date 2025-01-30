import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModeSelect from "../ModeSelect";
// import AppsIcon from "@mui/icons-material/Apps";
import "./style.css";
import Workspace from "./Menus/Workspace";
import Recent from "./Menus/Recent";
import Templates from "./Menus/Templates";
import { Badge, TextField, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import Starred from "./Menus/Starred";

function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: "",
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* <AppsIcon sx={{ color: "" }} /> */}
        <img
          className="trello-logo"
          src="https://logos-world.net/wp-content/uploads/2021/02/Trello-Logo.png"
          alt=""
          style={{ width: "100px", height: "50px", marginLeft: "20px" }}
        />
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspace />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
          sx={{ minWidth: "120px" }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            <NotificationsNoneIcon
              sx={{ color: "primary.main" }}
              fontSize="medium"
            />
          </Badge>
        </Tooltip>
        {/*  */}
        <Tooltip title="Help">
          <HelpOutlineIcon
            sx={{
              cursor: "pointer",
              color: "primary.main",
            }}
            fontSize="medium"
          />
        </Tooltip>
        {/*  */}
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
