import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailIcon from "@mui/icons-material/Mail";

import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";

function Sidebar({ username, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  // const [collapsed, setCollapsed] = useState(true);
  const [assetOpen, setAssetOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [custodianOpen, setCustodianOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const menuItems = [
  { name: "Home", icon: <HomeIcon />, path: "/home" },
 
  { name: "Profile", icon: <PersonIcon />, path: "/profile" },
  // { name: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
  { name: "Mail", icon: <MailIcon />, path: "/mail" },
];

  const menuItemClass = (path) =>
    `group flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300
     ${
       location.pathname === path
         ? "bg-white/20 text-white font-semibold shadow-md"
         : "text-white/80 hover:bg-white/20 hover:text-white"
     }`;

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="p-4">

        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`${menuItemClass(item.path)} ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              {item.icon}
              {!collapsed && item.name}
            </li>
          ))}
          {/* Custodian Management */}
<li>
  <div
    onClick={() => !collapsed && setCustodianOpen(!custodianOpen)}
    className={`group flex items-center ${
      collapsed ? "justify-center" : "justify-between"
    } p-3 rounded-xl cursor-pointer text-white hover:bg-white/20 transition`}
  >
    <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
      <PersonIcon />
      {!collapsed && "Custodian Management"}
    </div>

    {!collapsed &&
      (custodianOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
  </div>

  {custodianOpen && !collapsed && (
    <ul className="ml-6 mt-2 space-y-2 text-sm">

      <li
        onClick={() => navigate("/custodian/view")}
        className={menuItemClass("/custodian/view")}
      >
        View Custodians
      </li>

      <li
        onClick={() => navigate("/custodian/add")}
        className={menuItemClass("/custodian/add")}
      >
        Add Custodian
      </li>

    </ul>
  )}
</li>

          {/* Asset Management */}
          <li>
            <div
              onClick={() => !collapsed && setAssetOpen(!assetOpen)}
              className={`group flex items-center ${
                collapsed ? "justify-center" : "justify-between"
              } p-3 rounded-xl cursor-pointer text-white hover:bg-white/20 transition`}
            >
              <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                <InventoryIcon />
                {!collapsed && "Asset Management"}
              </div>

              {!collapsed &&
                (assetOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
            </div>

            {assetOpen && !collapsed && (
              <ul className="ml-6 mt-2 space-y-2 text-sm">
                <li
                  onClick={() => navigate("/assets")}
                  className={menuItemClass("/assets")}
                >
                  View Assets
                </li>

                <li
                  onClick={() => navigate("/assets/add")}
                  className={menuItemClass("/assets/add")}
                >
                  Add Asset
                </li>

                <li
                  onClick={() => navigate("/assets/reports")}
                  className={menuItemClass("/assets/reports")}
                >
                  Reports
                </li>
              </ul>
            )}
          </li>



        

        </ul>
      </div>

      <div className="p-4">
        {!collapsed && (
          <div className="mb-4 text-sm text-white/80">
            Logged in as <br />
            <span className="font-semibold text-white">{username}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } w-full p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition shadow-md`}
        >
          <LogoutIcon />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
     {/* Desktop Sidebar */}
<div
  onMouseEnter={() => setCollapsed(false)}
  onMouseLeave={() => setCollapsed(true)}
  className={`hidden md:flex flex-col transition-all duration-500
  ${collapsed ? "w-20" : "w-64"}
  bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800
  shadow-xl border-r border-white/20`}
>
  <SidebarContent />
</div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 shadow-2xl">
          <SidebarContent />
        </div>

        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        ></div>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 text-white text-2xl p-2 rounded-lg bg-blue-700/80 shadow-lg backdrop-blur-md"
      >
        <MenuIcon />
      </button>
    </>
  );
}

export default Sidebar;