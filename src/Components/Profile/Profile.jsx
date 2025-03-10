import React, { useEffect, useState } from "react";
import { Box, Button, Avatar, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { CalendarMonth, Place } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUsersTweets } from "../../Store/Twit/Action";

const Profile = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { auth, twit } = useSelector((store) => ({
    auth: store.auth,
    twit: store.twit,
  }));

  const isCurrentUser = auth?.user?.id?.toString() === id?.toString();
  const followingCount = auth.findUser?.following?.length || 0;
  const followersCount = auth.findUser?.followers?.length || 0;

  const handleBack = () => navigate(-1);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleFollowUser = async () => {
    try {
      await dispatch(followUserAction(id));

      // Cập nhật Redux ngay lập tức để giao diện đổi từ Follow -> Unfollow
      dispatch({
        type: "UPDATE_FOLLOWING",
        payload: id,
      });
    } catch (error) {
      console.error("Follow user failed", error);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        dispatch(findUserById(id)),
        dispatch(getUsersTweets(id)),
      ]).finally(() => setLoading(false));
    }
  }, [id, dispatch]);

  return (
    <div>
      {/* Header Section */}
      <div className="sticky-header flex items-center px-4">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold ml-5">
          {loading ? "Loading..." : auth.findUser?.fullName}
        </h1>
      </div>

      {/* Cover Section */}
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2025/01/09/16/33/playing-cards-9322164_1280.jpg"
          alt="cover"
        />
      </section>

      {/* Profile Info Section */}
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt={auth.findUser?.fullName}
            src={auth.findUser?.avatar || ""}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {isCurrentUser ? (
            <Button
              onClick={handleOpenProfileModal}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth?.user?.following?.includes(Number(id))
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
        </div>

        <div className="">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {auth.findUser?.isVerified && (
              <img
                className="ml-2 w-5 h-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
                alt="Verified account"
              />
            )}
          </div>
          <h1 className="text-gray-600">
            @ {auth.findUser?.fullName?.split(" ").join("_").toLowerCase()}
          </h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio || "Hello, I am a Java Developer!"}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <Place />
              <p className="ml-2">Viet Nam</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonth />
              <p className="ml-2">Joined August 2022</p>
            </div>
          </div>

          <div className="py-1 flex space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{followingCount}</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>{followersCount}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit?.twits?.length > 0 ? (
                twit.twits
                  .filter((tweet) => tweet.user.id.toString() === id) // So sánh ID
                  .map((item) => <TweetCard key={item.id} item={item} />)
              ) : (
                <p className="text-gray-500 text-center">Chưa có tweet nào</p>
              )}
            </TabPanel>

            <TabPanel value="2">User replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      {/* Profile Modal Section */}
      <ProfileModal
        open={openProfileModal}
        handleClose={handleCloseProfileModal}
      />
    </div>
  );
};

export default Profile;
