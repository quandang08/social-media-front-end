import Box from '@mui/material/Box';
import React from 'react';
import Navigation from '../Navigation/Navigation';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      px={5}  // Padding cho xs và md
      sx={{
        lg: { px: 36 }  // Padding cho màn hình lớn (lg)
      }}
      justifyContent="space-between"
    >
      {/* Left Part */}
      <Box flex={1} bgcolor="gray.100" p={4} sx={{ position: 'relative' }}>
        <Navigation /> {/* Đảm bảo Navigation được đóng thẻ đúng */} 
      </Box>

      {/* Middle Part */}
      <Box flex={2} bgcolor="white" p={4} sx={{ position: 'relative' }}>
        <h2>Middle Part</h2>
        <p>Content for the middle part goes here.</p>
      </Box>

      {/* Right Part */}
      <Box flex={1} bgcolor="gray.100" p={4} sx={{ position: 'relative' }}>
        <h2>Right Part</h2>
        <p>Content for the right part goes here.</p>
      </Box>
    </Box>
  );
};

export default HomePage;
