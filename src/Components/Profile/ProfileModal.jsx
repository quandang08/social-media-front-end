import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: 3,
};

const ProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = React.useState(false);
  const { auth } = useSelector((store) => store);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: auth.user?.fullName || "",
      website: auth.user?.website || "",
      location: auth.user?.location || "",
      bio: auth.user?.bio || "",
      backgroundImage: auth.user?.backgroundImage || "",
      image: auth.user?.image || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Fullname is required"),
      website: Yup.string().url("Invalid URL format"),
      bio: Yup.string().max(150, "Bio should not exceed 150 characters"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      dispatch(updateUserProfile(values));
      handleClose();
      alert("Profile updated successfully!");
    },
  });

  const handleImageChange = async (event, field) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      setUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        formik.setFieldValue(field, imageUrl);
      } catch (error) {
        alert("Image upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Edit Profile</h2>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              className="text-sm font-bold rounded-md"
              disabled={uploading || formik.isSubmitting}
            >
              {uploading ? "Uploading..." : "Save"}
            </Button>
          </div>

          <div className="mt-4 relative">
            <img
              className="w-full h-[12rem] object-cover object-center"
              src={
                formik.values.backgroundImage ||
                "https://cdn.pixabay.com/photo/2023/07/17/09/25/tree-8132250_1280.jpg"
              }
              alt="Background"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleImageChange(e, "backgroundImage")}
            />
          </div>

          <div className="relative flex justify-center mt-[-50px] ml-[-270px]">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              src={
                formik.values.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute w-50 h-50 opacity-0 cursor-pointer"
              onChange={(e) => handleImageChange(e, "image")}
            />
          </div>

          <Box
            mt={4}
            sx={{
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div>
              <label htmlFor="fullName">Fullname</label>
              <TextField
                id="fullName"
                name="fullName"
                label="FullName"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <TextField
                id="website"
                name="website"
                label="Website"
                variant="outlined"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <TextField
                id="location"
                name="location"
                label="Location"
                variant="outlined"
                value={formik.values.location}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                variant="outlined"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </div>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
