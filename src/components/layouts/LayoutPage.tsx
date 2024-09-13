import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Box } from "@mui/material";

export default function LayoutPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
}
