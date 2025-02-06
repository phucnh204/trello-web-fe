import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { BoardProps } from "../../../apis/type-mock-data";
//

const BoardContent: React.FC<BoardProps> = ({ board }) => {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        height: "calc(100vh - 55px - 65px)",
        p: "10px 0",
      }}
    >
      <ListColumns columns={board?.columns} />
    </Box>
  );
};

export default BoardContent;
