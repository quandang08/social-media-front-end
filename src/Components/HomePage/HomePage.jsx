import Box from "@mui/material/Box";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Navigate, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import { Route } from "react-router-dom";
import TwitDetails from "../TwitDetails/TwitDetails";
import Notifications from "../Notifications/Notifications";
import Explore from "../Explore/Explore";
import Messages from "../Messages/Messages";
import Lists from "../Lists/Lists"
import Communities from "../Communities/Communities"
import Verified from "../Verified/Verified"

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
        {/* <Route path="/" element={<Navigate to="/signin" replace />} /> */}
        <Routes>
          <Route path="/home" element={<HomeSection />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/verified" element={<Verified />} /> 
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/twit/:id" element={<TwitDetails />} />
        </Routes>
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
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <RightPart />
      </Box>
    </Box>
  );
};

export default HomePage;
