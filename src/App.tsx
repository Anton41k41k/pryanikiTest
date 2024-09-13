import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "./components/layouts/LayoutPage";
import LoginPage from "./pages/LoginPage";
import useAuthToken from "./hooks/useAuthToken";
import MainPage from "./pages/MainPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [, isAuthenticated] = useAuthToken();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route
              index
              element={
                isAuthenticated ? <MainPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
