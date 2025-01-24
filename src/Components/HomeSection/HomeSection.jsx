import { Avatar, Button, TextField, IconButton } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaImage, FaPoll, FaSmile } from "react-icons/fa"; 

// Validation schema
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
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
      {/* Input Section */}
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

          {/* Border to separate input and icons */}
          <div
            style={{
              borderBottom: "1px solid #ddd", 
              marginTop: "10px",
            }}
          />

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
              <IconButton style={{ color: "#007bff" }}>
                <FaImage size={20} />
              </IconButton>
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
