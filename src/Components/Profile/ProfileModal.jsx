import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";

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

const ProfileModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
      handleClose();
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      formik.setFieldValue("backgroundImage", imageURL);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Profile Modal</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="profile-modal-title">
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            {/* Header Modal */}
            <div className="flex justify-between items-center">
              <h2 style={{ fontWeight: "bold" }}>Edit Profile</h2>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: 2,
                  paddingX: 4,
                }}
              >
                Save
              </Button>
            </div>

            {/* Image Section */}
            <div className="mt-4 relative">
              <img
                className="w-full h-[12rem] object-cover object-center"
                src={
                  formik.values.backgroundImage ||
                  "https://cdn.pixabay.com/photo/2025/02/01/07/01/squirrel-9374282_1280.jpg"
                }
                alt="Background"
              />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                name="backgroundImage"
              />
            </div>

            {/* Form Scrollable Section */}
            <Box mt={4} sx={{ maxHeight: "70vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
              <div>
                <label htmlFor="fullname">Fullname</label>
                <input
                  id="fullname"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;
