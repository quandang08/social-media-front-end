import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, IconButton } from "@mui/material";
import { FaImage, FaPoll, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useFormik } from "formik";
import * as Yup from "yup";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Twit/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";

const HomeSection = () => {
  const { auth } = useSelector((store) => store);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const dispatch = useDispatch();
  const { twit } = useSelector((store) => store);

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
  });

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

  const handleSelectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    // Preview ảnh
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);

    // Upload ảnh
    try {
      const imgUrl = await uploadToCloudinary(file);
      formik.setFieldValue("image", imgUrl);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploadingImage(false);
  };

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue("content", formik.values.content + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (values) => {
    dispatch(createTweet(values));
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
      setSelectedImage(null);
    },
  });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", marginTop: 0 }}>
      {/* Post Box */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          marginTop: 25,
        }}
      >
        <Avatar
          src={auth.user?.image || "https://i.pravatar.cc/100"}
          alt={auth.user?.fullName || "User"}
        />
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "10px",
          }}
        >
          <TextField
            variant="standard"
            placeholder="What is happening?"
            sx={{
              fontSize: "18px",
              "& .MuiInputBase-root": { padding: "0px" },
              "& .MuiInput-underline:before": { borderBottom: "none" },
            }}
            {...formik.getFieldProps("content")}
            fullWidth
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />

          {/* Image Preview */}
          {selectedImage && (
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                maxWidth: "100%",
                maxHeight: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
              }}
            >
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          {/* Action Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <IconButton style={{ color: "#007bff" }} component="label">
                <FaImage size={20} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSelectImage}
                />
              </IconButton>

              <IconButton style={{ color: "#007bff" }}>
                <FaPoll size={20} />
              </IconButton>

              <IconButton
                style={{ color: "#007bff" }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile size={20} />
              </IconButton>

              <IconButton
                style={{ color: "#007bff" }}
                onClick={() => console.log("Add location clicked!")}
              >
                <FaMapMarkerAlt size={20} />
              </IconButton>
            </div>

            <Button
              type="submit"
              variant="contained"
              disabled={
                !formik.values.content ||
                Boolean(formik.errors.content) ||
                uploadingImage
              }
              style={{
                textTransform: "uppercase",
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "6px 16px",
                borderRadius: "5px",
              }}
            >
              {uploadingImage ? "Uploading..." : "Post"}
            </Button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          )}
        </form>
      </div>

      {/* TweetCard */}
      <section style={{ marginTop: "20px" }}>
        {twit?.twits?.length > 0 ? (
          twit.twits.map((item) => (
            <TweetCard key={item.id || item._id} item={item} />
          ))
        ) : (
          <p>No tweets found.</p>
        )}
      </section>
    </div>
  );
};

export default HomeSection;
