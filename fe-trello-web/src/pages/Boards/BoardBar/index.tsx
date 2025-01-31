import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
const MENU_STYLE = {
  color: "primary.main",
  bgcolor: "white",
  border: "none",
  px: "5px",
  borderRadius: "3px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};
function BoardBar() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          paddingX: 2,
          overflowX: "auto",
          borderTop: "1px solid #2196F3",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label="PhucnhCode"
            onClick={() => {}}
          />
          {/*  */}
          <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label="Public/Private Workspace"
            onClick={() => {}}
          />
          {/*  */}
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            onClick={() => {}}
          />
          {/*  */}
          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            onClick={() => {}}
          />
          {/*  */}
          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filter"
            onClick={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="outlined" endIcon={<PersonAddAlt1Icon/>}>
            Invite
          </Button>
          {/*  */}
          <AvatarGroup
            max={7}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: 16,
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
    </div>
  );
}

export default BoardBar;
