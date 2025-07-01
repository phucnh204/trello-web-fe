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
  const [hover, setHover] = useState<"light" | "dark" | "system" | null>(null);

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
        background: "rgba(0,194,224,0.07)",
        borderRadius: 3,
        boxShadow: "0 2px 8px 0 #00C2E022",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px 0 #00C2E044",
        },
      }}
      size="small"
    >
      <InputLabel id="label-select-dark-light-mode" sx={{ fontWeight: 600 }}>
        Giao diện
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={selectedMode}
        label="Giao diện"
        onChange={handleChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          borderRadius: 2,
          fontWeight: 600,
          background: "#fff",
          boxShadow: "none",
          "&:hover": {
            background: "#e0f7fa",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 3,
              boxShadow: "0 4px 24px 0 #00C2E044",
            },
          },
        }}
      >
        <MenuItem
          value="light"
          onMouseEnter={() => setHover("light")}
          onMouseLeave={() => setHover(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            fontWeight: 500,
            background: hover === "light" ? "#e0f7fa" : "inherit",
            transition: "background 0.2s",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: hover === "light" ? "#00C2E0" : "inherit",
              transition: "color 0.2s, transform 0.2s",
              transform:
                hover === "light" ? "scale(1.08) rotate(-8deg)" : "none",
            }}
          >
            <LightModeIcon />
            Sáng
          </Box>
        </MenuItem>
        <MenuItem
          value="dark"
          onMouseEnter={() => setHover("dark")}
          onMouseLeave={() => setHover(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            fontWeight: 500,
            background: hover === "dark" ? "#e0f7fa" : "inherit",
            transition: "background 0.2s",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: hover === "dark" ? "#00C2E0" : "inherit",
              transition: "color 0.2s, transform 0.2s",
              transform: hover === "dark" ? "scale(1.08) rotate(8deg)" : "none",
            }}
          >
            <DarkModeOutlineIcon />
            Tối
          </Box>
        </MenuItem>
        <MenuItem
          value="system"
          onMouseEnter={() => setHover("system")}
          onMouseLeave={() => setHover(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            fontWeight: 500,
            background: hover === "system" ? "#e0f7fa" : "inherit",
            transition: "background 0.2s",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: hover === "system" ? "#00C2E0" : "inherit",
              transition: "color 0.2s, transform 0.2s",
              transform:
                hover === "system" ? "scale(1.08) rotate(-8deg)" : "none",
            }}
          >
            <SettingsBrightnessIcon />
            Hệ thống
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
