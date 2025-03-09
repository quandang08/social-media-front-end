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
import { findUserById } from "../../Store/Auth/Action";

const Profile = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleBack = () => navigate(-1);
  const auth = useSelector((store) => store.auth) || {};
  const isCurrentUser = auth?.user?.id?.toString() === id?.toString();

  const dispatch = useDispatch();

  const handleOpenProfileModal = () => {
    console.log("Opening profile modal");
    setOpenProfileModal(true);
  };
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const handleFollowUser = () => console.log("follow user");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    console.log(`Selected Tab: ${newValue}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(findUserById(id));
      console.log("Fetching user with ID:", id);
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("User data:", auth.findUser);
  }, [auth.findUser]);

  // console.log("Auth user:", auth?.user);
  // console.log("Find user:", auth?.findUser);
  // console.log("Param ID:", id);
  // console.log("isCurrentUser:", isCurrentUser);

  return (
    <div>
      {/* Header Section */}
      <div className="sticky-header flex items-center px-4">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold ml-5">{auth.findUser?.fullName}</h1>
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
            alt="code with amu"
            src=""
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
              {auth?.user?.following?.includes(id) ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div className="">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {true && (
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
          <p>Hello, I am Amu. Nice to meet you and I am a Java Developer!</p>
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
              <span>200</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
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
              {[1, 2, 3, 4].map((item) => (
                <TweetCard key={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">user replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      {/* Profile Modal Section */}
      <section>
        <ProfileModal
          open={openProfileModal}
          handleClose={handleCloseProfileModal}
        />
      </section>
    </div>
  );
};

export default Profile;
