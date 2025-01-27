import Box from "@mui/material/Box";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      sx={{
        px: { xs: 2, md: 4, lg: 10 },
        gap: 0.5,
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* Left Part */}
      <Box
        flex={{ xs: "none", md: 0.2 }}
        bgcolor="white"
        p={1}
        sx={{
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Navigation />
      </Box>

      {/* Middle Part */}
      <Box
        flex={{ xs: 1, md: 0.6 }}
        bgcolor="white"
        p={3}
        sx={{
          minHeight: "100%",
          overflowY: "auto",
        }}
      >
        <HomeSection />
      </Box>

      {/* Right Part */}
      <Box
        flex={{ xs: "none", md: 0.4 }}
        bgcolor="white"
        p={1}
        sx={{
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
          scrollbarWidth: "none", // Ẩn thanh cuộn trên Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Ẩn thanh cuộn trên Chrome, Edge
          },
        }}
      >
        <RightPart />
      </Box>
    </Box>
  );
};

export default HomePage;
