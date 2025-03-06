import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, IconButton } from "@mui/material";
import { FaImage, FaPoll, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useFormik } from "formik";
import * as Yup from "yup";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../../Store/Twit/Action";

// Validation schema
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

// Styles
const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 0,
    marginTop: 0,
  },
  postBox: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    marginTop: 25,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: "10px",
  },
  imagePreview: {
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    maxHeight: "200px",
    maxWidth: "100%",
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  emojiPicker: {
    marginTop: "20px",
  },
  tweetCard: {
    marginTop: "20px",
  },
};

const HomeSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const dispatch = useDispatch();
  const { twit } = useSelector((store) => store);
  console.log("twit", twit);
  console.log("twit.twits:", twit?.twits);

  // const handleSubmit = (values) => {
  //   console.log("values", values);
  // };

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

  const handleSelectImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue("content", formik.values.content + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleAddLocation = () => {
    console.log("Add location clicked!");
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted:", values, selectedImage);
      resetForm();
      setSelectedImage(null);
    },
  });

  return (
    <div style={styles.container}>
      {/* Post Box */}
      <div style={styles.postBox}>
        <Avatar src="https://i.pravatar.cc/100" alt="username" />
        <form onSubmit={formik.handleSubmit} style={styles.form}>
          <TextField
            variant="standard"
            placeholder="What is happening?"
            sx={{
              fontSize: "18px",
              padding: 0,
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
            <div style={styles.imagePreview}>
              <img
                src={selectedImage}
                alt="Selected Preview"
                onError={(e) => (e.target.style.display = "none")}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}

          {/* Action Row */}
          <div style={styles.actionRow}>
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
                onClick={handleAddLocation}
              >
                <FaMapMarkerAlt size={20} />
              </IconButton>
            </div>

            <Button
              type="submit"
              variant="contained"
              disabled={
                !formik.values.content || Boolean(formik.errors.content)
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
              Post
            </Button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div style={styles.emojiPicker}>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </form>
      </div>

      {/* TweetCard */} 
      <section style={styles.tweetCard}>
        {twit?.twits && twit.twits.length > 0 ? (
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
