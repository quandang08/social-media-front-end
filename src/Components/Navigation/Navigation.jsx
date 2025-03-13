import React, { useState } from "react";
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
        padding: 0.5,
        justifyContent: "space-around",
        alignItems: "center",
        borderRight: "1px solid #ccc",
      }}
    >
      {/* Logo và Menu */}
      <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" } }}>
        <Box sx={{ mb: 1, textAlign: "left", pl: 0.3 }}>
          <img
            src="logo.png"
            alt="Logo"
            style={{
              height: 100,
              cursor: "pointer",
              display: "block",
            }}
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
        sx={{
          width: "190px",
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
          borderRadius: "12px",
          bgcolor: "white",
          transition: "all 0.3s",
          "&:hover": {
            bgcolor: "#e8f5fe",
          },
        }}
      >
        <Box display="flex" alignItems="center" sx={{ flex: 1, gap: 1.5 }}>
          <Avatar
            alt="User"
            src={
              auth.user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            sx={{ width: 45, height: 45, cursor: "pointer" }}
            onClick={() =>
              auth?.user?.id && navigate(`/profile/${auth.user.id}`)
            }
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontSize: 15, fontWeight: "bold", whiteSpace: "nowrap" }}
            >
              {auth.user?.fullName || "Amu"}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#657786" }}>
              @{auth.user?.email?.split("@")[0] || "amu"}
            </Typography>
          </Box>

          <MoreHorizIcon
            sx={{
              bgcolor: "white",
              color: "black",
              cursor: "pointer",
              fontSize: "35px",
              p: 1,
              borderRadius: "50%",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
            }}
            onClick={handleMenuOpen}
          />
        </Box>
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#000",
              color: "white",
              borderRadius: 3,
              boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.2)",
              padding: "10px",
              minWidth: 230,
              "&::before": {
                content: '""',
                position: "absolute",
                top: -6,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 12,
                height: 12,
                backgroundColor: "#000",
              },
              "& .MuiMenuItem-root": {
                fontSize: 15,
                padding: "10px 15px",
                "&:hover": {
                  backgroundColor: "#222",
                },
              },
            },
          },
        }}
      >
        <MenuItem> Add an existing account </MenuItem>
        <MenuItem onClick={handleLogout}>
          Log out @{auth.user?.email?.split("@")[0] || "user"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navigation;
