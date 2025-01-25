import React from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TweetCard = () => {
  const navigate = useNavigate(); // Định nghĩa navigate để sử dụng

  return (
    <div className="">
      {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
            <RepeatIcon/>
            <p>You Retweet</p>

        </div> */}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="username"
          src=""
        />
        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Code With Amu</span>
            <span className="text-gray-600 text-sm">@codewithamu . 2m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
