import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../home/Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const username =
    location.state?.username || localStorage.getItem("username") || "User";

  return (
    <div className="h-screen flex flex-col">

      {/* Navbar */}
      <Navbar username={username} />

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          username={username}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Page Content */}
        <main
          className={`flex-1 bg-gray-100 p-8 transition-all duration-300`}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;