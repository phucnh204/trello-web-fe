import { Box } from "@mui/material";


function BoardContent() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: "calc(100vh - 65px - 60px)",
          display: "flex",
          alignItems: "center",
          // justifyContent: "end",
        }}
      >
        Board content
      </Box>
    </div>
  );
}

export default BoardContent;
