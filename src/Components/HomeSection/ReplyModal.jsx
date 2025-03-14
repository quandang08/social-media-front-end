import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import {
  FiImage,
  FiSmile,
  FiBarChart2,
  FiMoreHorizontal,
} from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createTweetReply } from "../../Store/Twit/Action";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "white",
  color: "black",
  borderRadius: "16px",
  boxShadow: 24,
  p: 2,
};

export default function ReplyModal({
  open,
  handleClose,
  item,
  onReplySuccess,
}) {
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    console.log("Submit reply:", values);
    if (!values.twitId) {
      console.error("Missing twitId!");
      return;
    }
    const response = await dispatch(createTweetReply(values));
    if (response) {
      onReplySuccess?.();
      handleClose();
    } else {
      console.error("Reply failed!");
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: item?.id || "",
    },
    onSubmit: handleSubmit,
  });

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
            src={item?.user?.image || ""}
            className="cursor-pointer"
          />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-400 text-sm">
                @{item?.user?.fullName.split(" ").join("_").toLowerCase()} · 17h
              </span>
            </div>
            <p className="text-gray-600">pic.x.com/JivikzDa3v</p>
          </div>
        </div>

        {/* Replying to Section */}
        <div className="flex items-center px-4 py-2 mb-4 text-gray-600 text-sm bg-gray-200 rounded-md">
          <span>Replying to </span>
          <span className="text-blue-400 ml-1">
            @{item?.user?.fullName.split(" ").join("_").toLowerCase()}
          </span>
        </div>

        {/* User Reply Section */}
        <div className="flex gap-3 px-2 mb-4">
          <Avatar
            alt="User Avatar"
            src={auth.user?.image || ""}
            className="cursor-pointer"
          />

          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            placeholder="Post your reply"
            className="w-full bg-transparent text-black border-b border-gray-400 p-2 focus:outline-none resize-none h-24"
          />
        </div>

        {/* Footer with Icons */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex gap-4 text-gray-600">
            <FiImage className="cursor-pointer hover:text-white" size={20} />
            <FiBarChart2
              className="cursor-pointer hover:text-white"
              size={20}
            />
            <FiSmile className="cursor-pointer hover:text-white" size={20} />
            <FiMoreHorizontal
              className="cursor-pointer hover:text-white"
              size={20}
            />
          </div>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            disabled={!formik.values.content.trim()} // Vô hiệu hóa khi nội dung trống
            className={`flex items-center gap-2 px-4 py-1 rounded-full 
    ${
      formik.values.content.trim()
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
            <IoMdSend size={18} /> Reply
          </button>
        </div>
      </Box>
    </Modal>
  );
}
