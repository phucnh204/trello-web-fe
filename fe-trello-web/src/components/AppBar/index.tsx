import { Box } from '@mui/material';
import React from 'react'
import ModeSelect from '../ModeSelect';

function AppBar() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          // justifyContent: "end",
        }}
      >
        <ModeSelect />
      </Box>
    </div>
  );
}

export default AppBar;
