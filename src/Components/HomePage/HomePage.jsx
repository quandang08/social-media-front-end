import Box from '@mui/material/Box';
import React from 'react';
import Navigation from '../Navigation/Navigation';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      sx={{
        px: { xs: 2, md: 4, lg: 36 }, // Giảm padding bên ngoài
        gap: { xs: 2, md: 3 }, // Giảm khoảng cách giữa các phần
      }}
    >
      {/* Left Part */}
      <Box
        flex={{ xs: 'none', md: 0.5 }} // Giảm flex của Left để xát vào bên trong
        bgcolor="gray.100"
        p={2} // Giảm padding bên trong thêm
        sx={{ position: 'relative', borderRadius: 2 }}
      >
        <Navigation />
      </Box>

      {/* Middle Part */}
      <Box
        flex={5} // Tăng flex để phần giữa rộng hơn
        bgcolor="white"
        p={4}
        sx={{ position: 'relative', borderRadius: 2, boxShadow: 1 }}
      >
        <h2>Middle Part</h2>
        <p>Content for the middle part goes here.</p>
      </Box>

      {/* Right Part */}
      <Box
        flex={{ xs: 'none', md: 0.6 }} // Giảm flex của Right để xát vào bên trong
        bgcolor="gray.100"
        p={3} // Giảm padding bên trong
        sx={{ position: 'relative', borderRadius: 2 }}
      >
        <h2>Right Part</h2>
        <p>Content for the right part goes here.</p>
      </Box>
    </Box>
  );
};

export default HomePage;
