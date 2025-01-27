import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PendingIcon from "@mui/icons-material/Pending";
import { navigation } from "./NavigationMenu";

const Navigation = () => {
  // State để điều khiển menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70px", md: "250px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        px: 2,
        py: 0,
      }}
    >
      {/* Logo và Menu */}
      <Box>
        <Box sx={{ mb: 1, textAlign: "left", pl: 0.3 }}>
          <img
            src="logo.jpg"
            alt="Logo"
            style={{ height: 45, cursor: "pointer" }}
          />
        </Box>

        {navigation.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            style={{
              textDecoration: "none",
              display: "block",
              marginBottom: 8,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 1,
                transition: "background-color 0.3s",
                "&:hover": {
                  bgcolor: "#1a8cd8",
                },
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  ml: 1,
                  fontSize: 20,
                  color: "black",
                  display: { xs: "none", md: "block" },
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>

      {/* Nút Tweet */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#1d9bf0",
          color: "white",
          textTransform: "none",
          py: 1,
          fontSize: 16,
          mb: 10,
          borderRadius: "50px",
          "&:hover": {
            bgcolor: "#1a8cd8",
          },
        }}
      >
        Post
      </Button>

      {/* Profile Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 2,
          mt: 1,
        }}
      >
        <Avatar
          alt="User"
          src="user-avatar.jpg"
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ ml: 1, flexGrow: 1 }}>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Username
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#aaa" }}>
            @userhandle
          </Typography>
        </Box>
        {/* Icon Pending với Menu */}
        <Box>
          <PendingIcon
            size={20}
            sx={{
              color: "#1d9bf0",
              cursor: "pointer",
            }}
            onClick={handleMenuOpen} // Mở menu khi click
          />
          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 3,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
