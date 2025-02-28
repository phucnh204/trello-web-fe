import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="basic-button-profiles"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // endIcon={<ExpandMoreIcon />}
      >
        <Avatar
          sx={{ width: 32, height: 32 }}
          src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/465562307_587170200640794_5021424605932194248_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHjpS5nSmFqMdXZq_r4FkolUX7icwE9m8VRfuJzAT2bxQuzzVIHoIalhoGKjmQx_ag-I5qPLKdSN_L2mXtlgqTg&_nc_ohc=l7BnV9zko9UQ7kNvgGZoZbV&_nc_zt=24&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AgDg_TKIuf5ib_1sjMFeK-X&oh=00_AYB5BEBZ0nqsv9cbNlIRNrhXGmCq-TOVb354R25ZS6CEqg&oe=67A2296B"
        />
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
        <MenuItem
        // onClick={handleClose}
        >
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem
        //onClick={handleClose}
        >
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem
        //onClick={handleClose}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
        //onClick={handleClose}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
        //onClick={handleClose}
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
