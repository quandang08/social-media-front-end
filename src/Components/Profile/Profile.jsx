import React, { useState } from 'react';
import { Box, Button, Avatar, Tab, Tabs } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { CalendarMonth, Place } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Profile = () => {
    const [tabValue, setTabValue] = useState('1');
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);
    const handleOpenProfileModel = () => {
        console.log("open profile model")
    }
    const handleFollowUser = () => {
        console.log("follow user")
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);

        if (newValue === '4') {
            console.log("tab 4")
        } else if (newValue === '1') {
            console.log("users tweets")
        }
    }
    return (
        <div className="">
            <section className='{`z-50 flex items-center sticky top-0 bg-opacity-95`}' >
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Code With Amu</h1>
            </section>

            <section>
                <img className='w-[100%] h-[15rem] object-cover' src="https://cdn.pixabay.com/photo/2025/01/09/16/33/playing-cards-9322164_1280.jpg" alt="" />
            </section>

            <section className='pl-6'>
                <div className="flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar className='transform -translate-y-24'
                        alt="code with amu" src=''
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                    />

                    {true ? (
                        <Button
                            onClick={handleOpenProfileModel}
                            className='rounded-full'
                            variant='contained'
                            sx={{ borderRadius: "20px" }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <Button
                            onClick={handleFollowUser}
                            variant='contained'
                            sx={{ borderRadius: "20px" }}
                        >
                            {true ? "Follow" : "Unfollow"}
                        </Button>
                    )}
                </div>

                <div className="">
                    <div className='flex items-center'>
                        <h1 className='font-bold text-lg'>Code With Amu</h1>
                        {true && (<img
                            className="ml-2 w-5 h-5"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
                            alt="Verified account"
                        />
                        )}
                    </div>
                    <h1 className='text-gray-600'>@codewithamu</h1>
                </div>

                <div className="mt-2 space-y-3">
                    <p>Hello, I am Amu. Nice to meet you and I am a Java Developer!</p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon />
                            <p className='ml-2'>Education</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <Place />
                            <p className='ml-2'>Viet Nam</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <CalendarMonth />
                            <p className='ml-2'>Joined August 2022</p>
                        </div>
                    </div>

                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center space-x-1 font-semibold">
                            <span>200</span>
                            <span className='text-gray-500'>Following</span>
                        </div>

                        <div className="flex items-center space-x-1 font-semibold">
                            <span>590</span>
                            <span className='text-gray-500'>Followers</span>
                        </div>
                    </div>
                </div>
            </section>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Tweets" value="1" />
                            <Tab label="Replies" value="2" />
                            <Tab label="Media" value="3" />
                            <Tab label="Likes" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">user tweets</TabPanel>
                    <TabPanel value="2">user replies</TabPanel>
                    <TabPanel value="3">Media</TabPanel>
                    <TabPanel value="4">Likes</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Profile;
