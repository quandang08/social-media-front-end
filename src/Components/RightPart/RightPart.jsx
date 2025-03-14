import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import { getUnfollowedUsers } from "../../Store/Auth/Action";

const RightPart = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log("Auth State:", auth);
  const unfollowedUsers = useSelector((state) => state.auth.unfollowedUsers);
  const [showAll, setShowAll] = useState(false);
  const visibleUsers = showAll ? unfollowedUsers : unfollowedUsers.slice(0, 2);

  useEffect(() => {
    dispatch(getUnfollowedUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Unfollowed Users:", unfollowedUsers);
  }, [unfollowedUsers]);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="py-5 px-4 space-y-7 bg-white text-black relative z-10">
      {/* Search Bar */}
      <div className="relative flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search"
          className="py-2 rounded-full bg-gray-100 text-black w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-4 top-2 text-gray-500" />
        <Brightness4Icon className="text-gray-500 cursor-pointer ml-2" />
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
          onClick={handleOpenModal} // Thêm sự kiện click
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
        {visibleUsers.length > 0 ? (
          visibleUsers.map((auth) => (
            <div
              key={auth.id}
              className="flex justify-between items-center hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={auth.image || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-bold text-black">
                    {auth.fullName}
                  </h2>

                  <p className="text-xs text-gray-600">
                    @{auth.email.split("@")[0]}
                  </p>
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
          ))
        ) : (
          <p className="text-gray-600 text-sm">No users to follow</p>
        )}

        {unfollowedUsers.length > 2 && (
          <p
            className="text-blue-500 text-sm cursor-pointer hover:underline"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : "Show more"}
          </p>
        )}
      </section>
      {/* Subscription Modal */}
      <section>
        <SubscriptionModal open={isModalOpen} handleClose={handleCloseModal} />
      </section>
    </div>
  );
};

export default RightPart;
