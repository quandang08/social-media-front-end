import React, { useState, useEffect } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ReplyModal from "./ReplyModal";
import { useDispatch, useSelector } from "react-redux";
import { createReTweet, deleteTweet, likeTweet } from "../../Store/Twit/Action";

const TweetCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.totalLikes || 0);

  const [isRetweeted, setIsRetweeted] = useState(false);
  const [retweetCount, setRetweetCount] = useState(item?.totalRetweets || 0);
  const findUser  = useSelector((state) => state.auth?.findUser || null);
  const [tweet, setTweet] = useState(item);
  

  // Cập nhật isLiked mỗi khi item thay đổi
  useEffect(() => {
    if (!item) return;
    setIsLiked(
      Array.isArray(item.liked) && item.liked.includes(findUser?.id)
    );
    setLikeCount(item?.totalLikes || 0);
  }, [item, findUser]);

  //use Efferct Retweet
  useEffect(() => {
    if (!item) return;
    setIsRetweeted(
      Array.isArray(item.retwitUserId) &&
        item.retwitUserId.includes(findUser?.id)
    );
    setRetweetCount(item?.totalRetweets || 0);
  }, [item, findUser]);

  const handleLikeTweet = async () => {
    try {
      await dispatch(likeTweet(item.id));
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Lỗi khi like tweet:", error);
    }
  };

  const handleCreateRetweet = async () => {
    try {
      const response = await dispatch(createReTweet(item.id));

      if (response?.payload) {
        setIsRetweeted(response.payload.retwitUserId.includes(findUser?.id));
        setRetweetCount(response.payload.totalRetweets);
      }
    } catch (error) {
      console.error("Lỗi khi retweet:", error);
    }
  };

  const handleDeleteTweet = async () => {
    try {
      await dispatch(deleteTweet(item.id));
      handleClose();
    } catch (error) {
      console.error("Lỗi khi xóa tweet:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex space-x-5 mb-6 border-b pb-4">
      <Avatar
        onClick={() => navigate(`/profile/${item?.user.id}`)}
        className="cursor-pointer"
        alt="User"
        src={
          item?.user?.image ||
          "https://cdn.pixabay.com/photo/2020/04/28/13/27/rice-5104528_1280.jpg"
        }
      />

      <div className="w-full max-h-[500px] overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {item?.user?.fullName || "Unknown"}
          </span>
          <span className="text-gray-600 text-sm">
            @
            {item?.user?.fullName
              ? item?.user?.fullName.replace(/\s+/g, "_").toLowerCase()
              : "unknown"}{" "}
            · 2m
          </span>

          {item?.verified && (
            <img
              className="ml-2 w-5 h-5"
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
              alt="Verified"
            />
          )}

          <MoreHorizIcon
            className="ml-auto cursor-pointer text-blue-500"
            fontSize="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
          {/* edit & delete  */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
            {item?.user?.id === findUser?.id && (
              <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
            )}
          </Menu>
        </div>

        <div
          className="mt-1 cursor-pointer"
          onClick={() => navigate(`/twit/${item?.id}`)}
        >
          <p className="mb-3">{item?.content}</p>
          {item?.image && (
            <img
              className="w-full aspect-video object-contain border rounded-md"
              src={item.image}
              alt="Tweet"
            />
          )}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 cursor-pointer">
              <ChatBubbleOutlineIcon
                className="text-gray-500 hover:text-blue-500"
                fontSize="small"
                onClick={() => setOpenReplyModal(true)}
              />
              <span className="text-gray-500 text-sm">
                {item?.totalReplies}
              </span>
            </div>

            {/* Icon Like */}
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleLikeTweet}
            >
              {isLiked ? (
                <FavoriteIcon className="text-red-500" fontSize="small" />
              ) : (
                <FavoriteBorderIcon
                  className="text-gray-500 hover:text-red-500"
                  fontSize="small"
                />
              )}
              <span className="text-gray-500 text-sm">{likeCount}</span>
            </div>

            {/* Retweet  */}
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleCreateRetweet}
            >
              {isRetweeted ? (
                <RepeatIcon className="text-green-500" fontSize="small" />
              ) : (
                <RepeatIcon
                  className="text-gray-500 hover:text-green-500"
                  fontSize="small"
                />
              )}
              <span className="text-gray-500 text-sm">{retweetCount}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 cursor-pointer">
              <BarChartIcon
                className="text-gray-500 hover:text-yellow-500"
                fontSize="small"
              />
              <span className="text-gray-500 text-sm">1.2K</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <ShareIcon
                className="text-gray-500 hover:text-purple-500"
                fontSize="small"
              />
              <span className="text-gray-500 text-sm">67</span>
            </div>
            <BookmarkBorderIcon
              className="cursor-pointer text-gray-500 hover:text-gray-500"
              fontSize="small"
            />
          </div>
        </div>
      </div>

      <ReplyModal
        item={tweet}
        open={openReplyModal}
        handleClose={() => setOpenReplyModal(false)}
        onReplySuccess={() => {
          setTweet((prev) => ({
            ...prev,
            totalReplies: (prev.totalReplies || 0) + 1,
          }));
        }}
      />
    </div>
  );
};

export default TweetCard;
