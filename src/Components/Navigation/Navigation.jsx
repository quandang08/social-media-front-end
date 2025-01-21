import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { navigation } from "./NavigationMenu";
import Typography from "@mui/material/Typography";

const Navigation = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{
                height: "100vh",
                width: 280,
                bgcolor: "white",
                color: "black",
                p: 2,
            }}
        >
            {/* Logo and Navigation */}
            <Grid item>
                <Grid container direction="column" spacing={2}>
                    {/* Logo */}
                    <Grid item>
                        <img
                            src="logo.png"
                            alt="Logo"
                            style={{ height: 36, marginLeft: 8 }}
                        />
                    </Grid>

                    {/* Navigation Menu */}
                    {navigation.map((item, index) => (
                        <Grid item key={index}>
                            <Link to={item.path} style={{ textDecoration: "none" }}>
                                <Grid
                                    container
                                    alignItems="center"
                                    sx={{
                                        py: 0.5,
                                        px: 1.5,
                                        borderRadius: 1,
                                        "&:hover": { bgcolor: "#f0f0f0" },
                                    }}
                                >
                                    {item.icon}
                                    <Typography
                                        sx={{
                                            ml: 0.5,
                                            fontSize: 14,
                                            color: "black",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Grid>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Tweet Button */}
            <Grid item>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#1d9bf0",
                        color: "white",
                        textTransform: "none",
                        width: "100%",
                        fontSize: 14,
                        py: 0.8,
                        "&:hover": {
                            bgcolor: "#1a8cd8",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                >
                    Tweet
                </Button>
            </Grid>

            {/* User Profile */}
            <Grid item>
                <Link to={`/profile/${5}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Grid container alignItems="center" sx={{ cursor: "pointer", mt: 1 }}>
                        <Avatar
                            alt="User"
                            src="user-avatar.jpg"
                            sx={{ width: 32, height: 32 }}
                        />
                        <Grid item sx={{ ml: 0.5 }}>
                            <Typography variant="h6" sx={{ margin: 0, color: "black", fontSize: 14 }}>
                                Username
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#555", fontSize: 12 }}
                            >
                                @userhandle
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
            </Grid>
        </Grid>
    );
};

export default Navigation;
