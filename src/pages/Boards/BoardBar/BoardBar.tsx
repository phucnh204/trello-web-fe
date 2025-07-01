import { Avatar, AvatarGroup, Box, Button, Tooltip } from "@mui/material";
// import VpnLockIcon from "@mui/icons-material/VpnLock";
// import AddToDriveIcon from "@mui/icons-material/AddToDrive";
// import BoltIcon from "@mui/icons-material/Bolt";
// import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { BoardProps } from "../../../apis/type-mock-data";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const BoardBar: React.FC<BoardProps> = () => {
  const [open, setOpen] = useState(false);

  const handleInviteClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: { xs: 48, md: 65 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          paddingX: { xs: 1, md: 2 },
          overflowX: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/*  */}
          {/* <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label={board?.type}
            onClick={() => {}}
          /> */}
          {/*  */}
          {/* <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            onClick={() => {}}
          /> */}
          {/*  */}
          {/* <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            onClick={() => {}}
          /> */}
          {/*  */}
          {/* <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filter"
            onClick={() => {}}
          /> */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            endIcon={<PersonAddAlt1Icon />}
            onClick={handleInviteClick}
            sx={{
              borderRadius: 3,
              fontWeight: 600,
              px: 3,
              borderColor: "#00C2E0",
              color: "#00C2E0",
              background: "white",
              boxShadow: "0 2px 8px 0 #00C2E022",
              transition: "all 0.2s",
              "&:hover": {
                background: "#e0f7fa",
                borderColor: "#0099b7",
                color: "#0099b7",
                boxShadow: "0 4px 16px 0 #00C2E044",
                transform: "translateY(-2px) scale(1.04)",
              },
            }}
          >
            Invite
          </Button>
          <AvatarGroup
            max={7}
            sx={{
              "& .MuiAvatar-root": {
                width: 36,
                height: 36,
                fontSize: 16,
                border: "2px solid #fff",
                boxShadow: "0 2px 8px 0 #00C2E022",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  zIndex: 2,
                  transform: "scale(1.08)",
                  boxShadow: "0 4px 16px 0 #00C2E044",
                },
              },
            }}
          >
            <Tooltip title="phucnh">
              <Avatar
                alt="Remy Sharp"
                src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/465562307_587170200640794_5021424605932194248_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHjpS5nSmFqMdXZq_r4FkolUX7icwE9m8VRfuJzAT2bxQuzzVIHoIalhoGKjmQx_ag-I5qPLKdSN_L2mXtlgqTg&_nc_ohc=l7BnV9zko9UQ7kNvgGZoZbV&_nc_zt=24&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AgDg_TKIuf5ib_1sjMFeK-X&oh=00_AYB5BEBZ0nqsv9cbNlIRNrhXGmCq-TOVb354R25ZS6CEqg&oe=67A2296B"
              />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2200}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="info"
          sx={{ width: "100%", fontWeight: 600 }}
        >
          Tính năng đang phát triển!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default BoardBar;
