import { useColorScheme } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlineIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event: SelectChangeEvent) => {
    const selectMode = event.target.value as "light" | "dark" | "system";
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
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <MenuItem
          value="light"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LightModeIcon />
          Light
        </MenuItem>
        <MenuItem
          value="dark"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DarkModeOutlineIcon />
          Dark
        </MenuItem>
        <MenuItem
          value="system"
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SettingsBrightnessIcon />
          System
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
