import { Box } from "@mui/material";
import ModeSelect from "../ModeSelect";
// import AppsIcon from "@mui/icons-material/Apps";
import "./style.css";
import Workspace from "./Menus/Workspace";
import Recent from "./Menus/Recent";
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
        gap: "2",
      }}
    >
      <Box sx={{ gap: "0.5", display:"flex" , alignItems:"center"}}>
        {/* <AppsIcon sx={{ color: "" }} /> */}
        <img
          className="trello-logo"
          src="https://logos-world.net/wp-content/uploads/2021/02/Trello-Logo.png"
          alt=""
          style={{ width: "100px", height: "50px", marginLeft: "20px" }}
        />
        <Workspace />
        <Recent/>
      </Box>

      <Box sx={{}}>
        <ModeSelect />
      </Box>
    </Box>
  );
}

export default AppBar;
