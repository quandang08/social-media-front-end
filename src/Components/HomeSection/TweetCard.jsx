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
import ReplyModal from "./ReplyModal";

const TweetCard = ({ content, imageSrc }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenReplyModal = () => {
    setOpenReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setOpenReplyModal(false);
  };

  return (
    <React.Fragment>
      <div className="flex space-x-5 mb-6">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="username"
          src=""
        />
        <div className="w-full max-h-[500px] overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Code With Amu</span>
            <span className="text-gray-600 text-sm">@codewithamu . 2m</span>
            <img
              className="ml-2 w-5 h-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
              alt="Verified account"
            />
            <div className="ml-auto relative">
              <PendingIcon
                style={{ color: "#1d9bf0", cursor: "pointer", fontSize: 20 }}
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
          <div className="mt-0">
            <div className="cursor-pointer" onClick={() => navigate(`/twit/${3}`)}>
              <p className="mb-5 p-0">{content}</p>
              <img
                className="w-full aspect-video object-contain mx-auto border rounded-md"
                src={imageSrc}
                alt="Tweet"
              />

            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-3">
              <ChatBubbleOutlineIcon
                onClick={handleOpenReplyModal} // Nhấp để mở ReplyModal
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-blue-500"
              />
              <FavoriteBorderIcon
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-red-500"
              />
              <RepeatIcon
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-green-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <BarChartIcon
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-yellow-500"
              />
              <ShareIcon
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-purple-500"
              />
              <BookmarkBorderIcon
                style={{ cursor: "pointer", fontSize: 18 }}
                className="transition-colors duration-200 hover:text-gray-500"
              />
            </div>
          </div>
        </div>

        <section>
          <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal} />
        </section>
      </div>
    </React.Fragment>
  );
};


const TweetFeed = () => {
  const tweets = [
    {
      content:
        "twitter clone - full stack project Spring Boot and React Tailwind",
      imageSrc: "logo512.png",
    },
    {
      content: "Learning React and Material UI is fun!",
      imageSrc:
        "logo512.png",
    },
    {
      content: "Just finished a cool project, check it out!",
      imageSrc:
        "logo512.png",
    },
    {
      content: "Spring Boot with React is the future!",
      imageSrc:
        "logo512.png",
    },
    {
      content: "Exploring new technologies for building web apps.",
      imageSrc:
        "logo512.png",
    },
  ];

  return (
    <div>
      {tweets.map((tweet, index) => (
        <TweetCard
          key={index}
          content={tweet.content}
          imageSrc={tweet.imageSrc}
        />
      ))}
    </div>
  );
};

export default TweetFeed;
