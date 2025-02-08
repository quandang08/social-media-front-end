import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import { Button } from "@mui/material";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

const RightPart = () => {
  return (
    <div className="py-5 px-4 space-y-7 bg-white text-black">
      {/* Search Bar */}
      <div className="relative flex items-center space-x-2">
        {" "}
        <input
          type="text"
          placeholder="Search"
          className="py-2 rounded-full bg-gray-100 text-black w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-4 top-2 text-gray-500" />
        <Brightness4Icon className="text-gray-500 cursor-pointer ml-2" />{" "}
      </div>

      {/* Subscribe to Premium */}
      <section className="bg-gray-100 rounded-lg p-4">
        <h1 className="text-lg font-bold">Subscribe to Premium</h1>
        <p className="text-sm text-gray-600 mt-2">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "capitalize",
            borderRadius: "30px",
            background: "#1DA1F2",
            fontSize: "0.875rem",
            padding: "6px 16px",
            width: "50%",
            margin: "0 auto",
            marginTop: "10px",
            ":hover": { background: "#0d8adf" },
          }}
          className="mt-4"
        >
          Subscribe
        </Button>
      </section>

      {/* What's happening */}
      <section className="bg-gray-100 rounded-lg p-4 space-y-4">
        <h1 className="font-bold text-lg">What's happening</h1>
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          >
            <div>
              <p className="text-sm text-gray-600">Trending in Vietnam</p>
              <h2 className="text-sm font-bold text-black">
                Topic {index + 1}
              </h2>
              <p className="text-xs text-gray-600">5,000 posts</p>
            </div>
            <MoreHorizIcon className="text-gray-500" />
          </div>
        ))}
        <p className="text-blue-500 text-sm cursor-pointer hover:underline">
          Show more
        </p>
      </section>

      {/* Who to follow */}
      <section className="bg-gray-100 rounded-lg p-4 space-y-4">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {[1, 2].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://via.placeholder.com/40`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-sm font-bold text-black">Jane Doe</h2>
                <p className="text-xs text-gray-600">@janedoe</p>
              </div>
            </div>
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "capitalize",
                borderRadius: "50px",
                borderColor: "#1DA1F2",
                color: "#1DA1F2",
                ":hover": { borderColor: "#0d8adf", background: "#0d8adf10" },
              }}
            >
              Follow
            </Button>
          </div>
        ))}
        <p className="text-blue-500 text-sm cursor-pointer hover:underline">
          Show more
        </p>
      </section>

      <section>
        <SubscriptionModal/>
      </section>
    </div>
  );
};

export default RightPart;
