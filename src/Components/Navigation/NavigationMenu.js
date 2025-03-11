import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from '@mui/icons-material/Pending';

export const navigation = [
  { title: "Home", icon: <HomeIcon style={{ color: "black" }}/>, path: "/home" },
  { title: "Explore", icon: <SearchIcon style={{ color: "black" }}/>, path: "/explore" },
  { title: "Notifications", icon: <NotificationsIcon style={{ color: "black" }}/>, path: "/notifications" },
  { title: "Messages", icon: <MessageIcon style={{ color: "black" }}/>, path: "/messages" },
  { title: "Lists", icon: <ListAltIcon style={{ color: "black" }}/>, path: "/lists" },
  { title: "Communities", icon: <GroupIcon style={{ color: "black" }}/>, path: "/communities" },
  { title: "Verified", icon: <VerifiedIcon style={{ color: "black" }}/>, path: "/verified" },
  { title: "Profile", icon: <AccountCircleIcon style={{ color: "black" }}/>, path: "/profile" },
  { title: "More", icon: <PendingIcon style={{ color: "black" }}/> , path: "/more" }
];
