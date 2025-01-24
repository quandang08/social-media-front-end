import React, { useState } from "react";
import { Avatar, Button, TextField, IconButton } from "@mui/material";
import { FaImage, FaPoll, FaSmile } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Khai báo kiểu phù hợp

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result); // Chỉ gán nếu là chuỗi
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values, selectedImage);
    },
  });

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 0,
        marginTop: 0,
      }}
    >
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
        {/* Avatar */}
        <Avatar src="https://i.pravatar.cc/100" alt="username" />

        {/* Input Form */}
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "10px",
          }}
        >
          {/* Text Input */}
          <TextField
            variant="standard"
            placeholder="What is happening?"
            sx={{
              fontSize: "18px",
              padding: 0,
              "& .MuiInputBase-root": {
                padding: "0px",
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
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
                maxHeight: "200px",
                maxWidth: "100%",
              }}
            >
              <img
                src={selectedImage}
                alt="Selected Preview"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          )}

          {/* Row for icons and post button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {/* Media, Poll, Emoji icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {/* Upload Image Icon */}
              <IconButton
                style={{ color: "#007bff" }}
                component="label"
              >
                <FaImage size={20} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSelectImage}
                />
              </IconButton>

              {/* Other icons */}
              <IconButton style={{ color: "#007bff" }}>
                <FaPoll size={20} />
              </IconButton>
              <IconButton style={{ color: "#007bff" }}>
                <FaSmile size={20} />
              </IconButton>
            </div>

            {/* Post Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.values.content || Boolean(formik.errors.content)}
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
        </form>
      </div>
    </div>
  );
};

export default HomeSection;
