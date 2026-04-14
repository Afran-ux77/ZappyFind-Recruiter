import { createTheme } from "@mui/material/styles";

const primaryMain = "#F8723A";

export const appTheme = createTheme({
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h2: {
      fontSize: "2.5rem",
      lineHeight: 1.15,
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "2rem",
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.65,
    },
    body2: {
      fontSize: "0.92rem",
      lineHeight: 1.55,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
      light: "#FF946A",
      dark: "#D95924",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFDF9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1D1A17",
      secondary: "#6F6861",
    },
    divider: "#EFE7DE",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "box-shadow 180ms ease, border-color 180ms ease",
          backgroundColor: "#FFFFFF",
          minHeight: 50,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E7DED3",
            borderWidth: 1.25,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D6CABE",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryMain,
            borderWidth: 1.5,
          },
        },
        input: {
          padding: "14px 18px",
          fontSize: "1rem",
          lineHeight: 1.35,
          fontWeight: 500,
          color: "#241F1A",
          /* Keep filled/autofilled inputs matching normal background (no browser blue tint). */
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
            WebkitTextFillColor: "#241F1A",
            caretColor: "#241F1A",
          },
          "&:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
          },
          "&:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#7B726A",
          fontWeight: 600,
          fontSize: "1rem",
          transform: "translate(18px, 14px) scale(1)",
          transformOrigin: "top left",
          transition: "all 160ms ease",
          "&.MuiInputLabel-shrink": {
            transform: "translate(18px, -8px) scale(0.82)",
            color: "#6E665F",
          },
          "&.Mui-focused": {
            color: primaryMain,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "12px 18px",
        },
        containedPrimary: {
          boxShadow: "0 8px 24px rgba(248, 114, 58, 0.26)",
          "&:hover": {
            boxShadow: "0 10px 28px rgba(248, 114, 58, 0.34)",
          },
        },
      },
    },
  },
});
