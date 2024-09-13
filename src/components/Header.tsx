import { AppBar, Box, Button, Toolbar } from "@mui/material";
import AuthModal from "./modals/AuthModal";
import useAuthToken from "../hooks/useAuthToken";
import AddDocumentModal from "./modals/AddDocumentModal";

export default function Header() {
  const [, isAuthenticated, removeCookie] = useAuthToken();
  function handleLogOut() {
    removeCookie("x-auth");
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AddDocumentModal />
          {isAuthenticated ? (
            <Button onClick={handleLogOut}>LogOut</Button>
          ) : (
            <AuthModal />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
