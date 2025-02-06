import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Column />
      <Column />

      <Box sx={{}}>
        <Button endIcon={<CreateNewFolderIcon />}>Add new column</Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
