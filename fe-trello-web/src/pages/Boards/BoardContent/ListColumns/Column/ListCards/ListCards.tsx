import React from "react";

import { Box } from "@mui/material";
import Card from "./Card/Card";

function ListCards() {
  return (
    <Box
      sx={{
        mt: 1,
        px: "15px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* Card 1 */}
      <Card />
      <Card temporaryHideMedia />
    </Box>
  );
}

export default ListCards;
