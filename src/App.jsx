import { Box, Paper } from "@mui/material";
import AuthShowcase from "./components/AuthShowcase";
import RecruiterAuthForm from "./components/RecruiterAuthForm";

export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#FFFDF9",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          overflow: "hidden",
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              minHeight: { xs: 360, md: "100%" },
            }}
          >
            <AuthShowcase />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 3, sm: 5, md: 6 },
              py: { xs: 4, md: 8 },
              backgroundColor: "#FCF8F2",
              borderLeft: { xs: "none", md: "1px solid #EFE5DA" },
              overflowY: "auto",
            }}
          >
            <RecruiterAuthForm />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
