import { Box } from "@mui/material";

function BoardBar() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: "65px",
          display: "flex",
          alignItems: "center",
          // justifyContent: "end",
        }}
      >
        Board bar
      </Box>
    </div>
  );
}

export default BoardBar;
