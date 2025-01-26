import Box from "@mui/material/Box";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }} // Xếp dọc trên màn hình nhỏ, ngang trên màn hình lớn
      justifyContent="space-between"
      sx={{
        px: { xs: 2, md: 6, lg: 15 }, // Padding ngang tổng thể
        gap: 1, // Khoảng cách giữa các phần
        minHeight: "100vh", // Chiều cao toàn màn hình
        bgcolor: "#f5f5f5", // Màu nền
      }}
    >
      {/* Left Part */}
      <Box
        flex={{ xs: "none", md: 0.2 }} // Chiếm 20% chiều rộng trên màn hình lớn
        bgcolor="white"
        p={1}
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          height: "100vh", // Chiều cao cố định, không cuộn theo
          position: "sticky", // Giữ phần này cố định khi cuộn
          top: 0, // Đảm bảo phần này bám vào đầu trang khi cuộn
        }}
      >
        <Navigation />
      </Box>

      {/* Middle Part */}
      <Box
        flex={{ xs: 1, md: 0.6 }} // Chiếm 60% chiều rộng trên màn hình lớn
        bgcolor="white"
        p={4}
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          minHeight: "100%", // Lấp đầy chiều cao
          overflowY: "auto", // Cuộn phần này khi nội dung quá dài
        }}
      >
        <HomeSection />
      </Box>

      {/* Right Part */}
      <Box
        flex={{ xs: "none", md: 0.4 }} // Chiếm 20% chiều rộng trên màn hình lớn
        bgcolor="white"
        p={1}
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          height: "100vh", // Chiều cao cố định, không cuộn theo
          position: "sticky", // Giữ phần này cố định khi cuộn
          top: 0, // Đảm bảo phần này bám vào đầu trang khi cuộn
        }}
      >
        <h3>Right Part</h3>
        <p>This is the right section. Add widgets, ads, or additional content here.</p>
        <p>Test adding more content to check scrolling behavior.</p>
      </Box>
    </Box>
  );
};

export default HomePage;
