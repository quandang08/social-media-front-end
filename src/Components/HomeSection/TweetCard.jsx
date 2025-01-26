import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { useNavigate } from "react-router-dom";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const TweetCard = () => {
  const navigate = useNavigate();

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
    <div className="flex space-x-5">
      {/* Avatar của người dùng */}
      <Avatar
        onClick={() => navigate(`/profile/${6}`)}
        className="cursor-pointer"
        alt="username"
        src=""
      />

      {/* Nội dung của tweet */}
      <div className="w-full max-h-[500px] overflow-hidden">
        {" "}
        {/* Giới hạn chiều cao và ẩn phần vượt quá */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">Code With Amu</span>
          <span className="text-gray-600 text-sm">@codewithamu . 2m</span>
          <img
            className="ml-2 w-5 h-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
            alt="Verified account"
          />

          {/* Menu Section - Pending icon nằm ở góc phải */}
          <div className="ml-auto relative">
            <PendingIcon
              style={{ color: "#1d9bf0", cursor: "pointer", fontSize: 20 }} // Sử dụng fontSize thay vì size
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{
                mt: 1,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        {/* Nội dung bài đăng */}
        <div className="mt-0">
          <div className="cursor-pointer">
            <p className="mb-5 p-0">
              twitter clone - full stack project Spring Boot and React Tailwind
            </p>
            <img
              className="w-full h-[350px] object-cover border border-gray-400 p-5 rounded-md"
              src="logo512.png"
              alt="Tweet image"
            />
          </div>
        </div>
        {/* Các icon tương tác dưới bài đăng */}
        <div className="flex justify-between mt-4">
          {/* Các icon tương tác bên trái */}
          <div className="flex items-center space-x-3">
            <ChatBubbleOutlineIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-blue-500"
            />
            <FavoriteBorderIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-red-500"
            />
            <RepeatIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-green-500"
            />
          </div>

          {/* Các icon tương tác bên phải */}
          <div className="flex items-center space-x-3">
            <BarChartIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-yellow-500"
            />
            <ShareIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-purple-500"
            />
            <BookmarkBorderIcon
              style={{ cursor: "pointer", fontSize: 20 }}
              className="transition-colors duration-200 hover:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
