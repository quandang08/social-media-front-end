import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { FiImage, FiSmile, FiBarChart2, FiMoreHorizontal } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "#1E1E1E",
  color: "white",
  borderRadius: "16px",
  boxShadow: 24,
  p: 2,
};

export default function ReplyModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-between items-center mb-4 px-2">
          <IconButton onClick={handleClose} className="text-white">
            <CloseIcon />
          </IconButton>
          <span className="text-blue-400 text-sm">Drafts</span>
        </div>

        {/* Tweet Info */}
        <div className="flex gap-3 px-2 mb-4">
          <Avatar
            alt="User Avatar"
            src="https://via.placeholder.com/50"
            className="cursor-pointer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Donald J. Trump</span>
              <span className="text-gray-400 text-sm">@realDonaldTrump · 17h</span>
            </div>
            <p className="text-gray-300">pic.x.com/JivikzDa3v</p>
          </div>
        </div>

        {/* Replying to Section */}
        <div className="flex items-center px-4 py-2 mb-4 text-gray-400 text-sm bg-gray-800 rounded-md">
          <span>Replying to </span>
          <span className="text-blue-400 ml-1">@realDonaldTrump</span>
        </div>

        {/* User Reply Section */}
        <div className="flex gap-3 px-2 mb-4">
          <Avatar
            alt="User Avatar"
            src="https://via.placeholder.com/50"
            className="cursor-pointer"
          />
          <textarea
            placeholder="Post your reply"
            className="w-full bg-transparent text-white border-b border-gray-600 p-2 focus:outline-none resize-none h-24"
          ></textarea>
        </div>

        {/* Footer with Icons */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex gap-4 text-gray-400">
            <FiImage className="cursor-pointer hover:text-white" size={20} />
            <FiBarChart2 className="cursor-pointer hover:text-white" size={20} />
            <FiSmile className="cursor-pointer hover:text-white" size={20} />
            <FiMoreHorizontal className="cursor-pointer hover:text-white" size={20} />
          </div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600">
            <IoMdSend size={18} /> Reply
          </button>
        </div>

        </Box>
    </Modal>
  );
}