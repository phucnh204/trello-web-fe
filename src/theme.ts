import { createTheme } from "@mui/material/styles";
// import { blue, cyan, deepOrange, orange } from "@mui/material/colors";

// import { BorderColor } from "@mui/icons-material";

const theme = createTheme({
  // light/dark
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#0079BF", // Trello Blue
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#EBECF0", // Light background
          contrastText: "#172B4D",
        },
        background: {
          default: "#F4F5F7", // Trello board background
          paper: "#FFFFFF",
        },
        text: {
          primary: "#172B4D",
          secondary: "#42526E",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#172B4D", // Dark mode blue
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#1D2125", // Dark background
          contrastText: "#8F9CA7",
        },
        background: {
          default: "#101204", // Dark Trello Board background
          paper: "#1D2125",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8F9CA7",
        },
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
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "#ffffff" : "#1565c0",
          textTransform: "none",
          fontWeight: "700",
        }),
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
            "& .fieldset": {
              borderWidth: "1px !important",
            },
          };
        },
      },
    },
  },
});

export default theme;
