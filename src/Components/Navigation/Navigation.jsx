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

const Navigation = () => {
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
                borderRadius: 1, // Giá trị mặc định
                transition: "all 0.3s", // Thêm hiệu ứng mượt cho hover
                "&:hover": {
                  bgcolor: "rgba(29, 155, 240, 0.1)", // Màu nền hover
                  borderRadius: "12px", // Tăng border-radius khi hover
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
        sx={{
          p: 2,
          mt: 1,
        }}
      >
        {/* Avatar và Thông tin User */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Avatar
            alt="User"
            src="user-avatar.jpg"
            sx={{ width: 40, height: 40 }} // Giảm kích thước avatar
          />
          <Box sx={{ ml: 1.5 }}>
            {" "}
            {/* Tăng khoảng cách giữa avatar và thông tin */}
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
              Username
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#aaa" }}>
              @userhandle
            </Typography>
          </Box>
        </Box>

        {/* Icon MoreHoriz */}
        <MoreHorizIcon
          size={20}
          sx={{
            color: "#1d9bf0",
            cursor: "pointer",
          }}
          onClick={handleMenuOpen} // Mở menu khi click
        />
      </Box>

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
  );
};

export default Navigation;
