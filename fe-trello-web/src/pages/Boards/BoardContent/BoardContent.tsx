import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
//

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        height: "calc(100vh - 55px - 65px)",
        p: "10px 0",
      }}
    >
      <ListColumns />
    </Box>
  );
}

export default BoardContent;
