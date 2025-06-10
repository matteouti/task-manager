// frontend/src/App.js
import React from "react";
import { Container, CssBaseline, Typography, Box } from "@mui/material";
import TaskManager from "./components/TaskManager";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Gestionnaire de Tâches
          </Typography>
          <TaskManager />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
