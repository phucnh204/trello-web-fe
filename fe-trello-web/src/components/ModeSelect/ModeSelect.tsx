import { Box, useColorScheme } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlineIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useState } from "react";
function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const [selectedMode, setSelectedMode] = useState(mode || "system");

  const handleChange = (event: SelectChangeEvent) => {
    const selectMode = event.target.value as "light" | "dark" | "system";
    setSelectedMode(selectMode);
    setMode(selectMode);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      size="small"
    >
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={selectedMode}
        label="Mode"
        onChange={handleChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
        }}
      >
        <MenuItem
          value="light"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon />
            Light
          </Box>
        </MenuItem>
        <MenuItem
          value="dark"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlineIcon />
            Dark
          </Box>
        </MenuItem>
        <MenuItem
          value="system"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
