import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.jpg";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-gradient-to-r h-16from-cyan-500 via-blue-600 to-indigo-700 backdrop-blur-md shadow-md border-b border-white/20"
      >
        <Toolbar className="flex justify-between items-center">
          {/* Logo */}
          <Box
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            className="flex-1 text-center font-extrabold text-white text-xl md:text-2xl"
          >
            Asset Management
          </Typography>

          {/* Desktop Links */}
          <Box className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-medium transition-all duration-300 text-white ${
                    isActive ? "bg-white/20" : "hover:bg-white/20"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {username && (
              <Box className="ml-4 px-4 py-2 bg-white text-blue-600 rounded-xl shadow-md text-sm font-semibold">
                Hi, {username}
              </Box>
            )}
          </Box>

          {/* Hamburger - only on mobile */}
          <Box className="md:hidden">
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="w-64 p-4">
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
            {username && (
              <ListItem>
                <ListItemText primary={`Hi, ${username}`} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;