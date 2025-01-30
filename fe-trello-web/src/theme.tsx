import { createTheme } from "@mui/material/styles";
import { blue, cyan, deepOrange, orange } from "@mui/material/colors";

// import { BorderColor } from "@mui/icons-material";

const theme = createTheme({
  // light/dark
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },

  // font chữ button thuộc Mui
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdc3c7",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#00b894",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          //fontSize: "1rem",
          textTransform: "none",
          fontWeight: "700",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.light,
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            },
          };
        },
      },
    },
  },
});

export default theme;
