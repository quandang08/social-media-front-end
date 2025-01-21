import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { navigation } from "./NavigationMenu";

const Navigation = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: 280,
        bgcolor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2
      }}
    >
      {/* Logo and Navigation */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <img src="logo.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
        </Box>
        {navigation.map((item, index) => (
          <Link key={index} to={item.path} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1,
                px: 2,
                borderRadius: 2,
                "&:hover": { bgcolor: "#1a1a1a" }
              }}
            >
              {item.icon}
              <span style={{ marginLeft: 16, fontSize: 16 }}>{item.title}</span>
            </Box>
          </Link>
        ))}
      </Box>

      {/* Tweet Button and Profile */}
      <Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1d9bf0",
            color: "white",
            textTransform: "none",
            width: "100%",
            fontSize: 16,
            py: 1,
            mb: 3,
            "&:hover": { bgcolor: "#1a8cd8" }
          }}
        >
          Tweet
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="User" src="user-avatar.jpg" />
          <Box sx={{ ml: 2 }}>
            <h4 style={{ margin: 0 }}>Username</h4>
            <span style={{ fontSize: 14, color: "#888" }}>@userhandle</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
