import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { navigation } from "./NavigationMenu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    console.log("Auth state:", auth);
    navigate("/signin");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        height: { xs: "auto", md: "100vh" },
        width: { xs: "100%", md: "250px" },
        position: "fixed",
        bottom: 0,
        backgroundColor: "#fff",
        zIndex: 10,
        padding: 1,
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Logo và Menu */}
      <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" } }}>
        <Box sx={{ mb: 1, textAlign: "left", pl: 0.3 }}>
          <img
            src="logo.jpg"
            alt="Logo"
            style={{ height: 45, cursor: "pointer" }}
          />
        </Box>

        {navigation.map((item, index) => (
          <Box
            key={index}
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth?.user?.id || "default"}`)
                : navigate(item.path)
            }
            style={{
              textDecoration: "none",
              display: "block",
              marginBottom: 8,
              cursor: "pointer",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{
                px: 0.5,
                py: 0.5,
                borderRadius: 1,
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "rgba(29, 155, 240, 0.1)",
                  borderRadius: "12px",
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
          </Box>
        ))}
      </Box>

      {/* Nút Post */}
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
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {/* Avatar và Thông tin User */}
        <Box display="flex" alignItems="center" sx={{ gap: 1.5 }}>
          <Avatar
            alt="User"
            src="user-avatar.jpg"
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={() =>
              auth?.user?.id && navigate(`/profile/${auth.user.id}`)
            }
          />

          <Box>
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
              {auth.user?.fullName || "Amu"}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#aaa" }}>
              @
              {auth.user?.email?.replace(/\s+/g, "_").toLowerCase() || "amu"}
            </Typography>
          </Box>
        </Box>

        {/* Icon MoreHoriz */}
        <MoreHorizIcon
          sx={{
            color: "#1d9bf0",
            cursor: "pointer",
            fontSize: "20px",
          }}
          onClick={handleMenuOpen}
        />
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              boxShadow: 3,
              borderRadius: 2,
            },
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Navigation;
