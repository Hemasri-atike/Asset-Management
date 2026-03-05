import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Box } from "@mui/material";

function Layout() {
  const [collapsed, setCollapsed] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <Box className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        username={localStorage.getItem("username") || "User"}
      />

      {/* Main Content */}
      <Box
        component="main"
        className={`flex-1 pt-16 transition-all duration-500 ease-in-out`}
        sx={{
          ml: isMobile ? 0 : collapsed ? "80px" : "256px",
        }}
      >
        <Box className="p-6 md:p-8 bg-gray-50 min-h-[calc(100vh-4rem)] rounded-tr-3xl rounded-br-3xl shadow-inner">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;