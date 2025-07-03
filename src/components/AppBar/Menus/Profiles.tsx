import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { getUserInfo } from "../../../utils/auth";

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = getUserInfo();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Hiển thị avatar, tên, email luôn ở AppBar */}
      <Avatar
        sx={{ width: 32, height: 32 }}
        src={user?.avatar || user?.picture || ""}
        alt={user?.name || "User"}
      />
      <Box display={{ xs: "none", sm: "block" }}>
        <Typography fontWeight="bold" fontSize={14}>
          {user?.name}
        </Typography>
        <Typography variant="body2" fontSize={12} color="text.secondary">
          {user?.email}
        </Typography>
      </Box>
      {/* Nút mở menu */}
      <Button
        id="basic-button-profiles"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: 0, p: 0, ml: 1 }}
      >
        <Settings />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profiles",
        }}
      >
        <MenuItem disabled>
          <Avatar
            sx={{ width: 28, height: 28, mr: 2 }}
            src={user?.avatar || user?.picture}
          />
          <Box>
            <Typography fontWeight="bold">{user?.name}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_info");
            localStorage.removeItem("hasSeenWelcome");
            window.location.href = "/login";
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profiles;
