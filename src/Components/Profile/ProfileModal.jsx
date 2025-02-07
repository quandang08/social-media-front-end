// ProfileModal.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import './ProfileModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: 3,
};

const ProfileModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      fullname: '',
      website: '',
      location: '',
      bio: '',
      backgroundImage: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Fullname is required'),
      website: Yup.string().url('Invalid URL format'),
      bio: Yup.string().max(150, 'Bio should not exceed 150 characters'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      handleClose();
      alert('Profile updated successfully!');
    },
  });

  const handleImageChange = (event) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue('backgroundImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="profile-modal-title">
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Edit Profile</h2>
            <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} className="text-sm font-bold rounded-md">
              Save
            </Button>
          </div>

          <div className="mt-4 relative">
            <img
              className="w-full h-[12rem] object-cover object-center"
              src={formik.values.backgroundImage || 'https://cdn.pixabay.com/photo/2023/07/17/09/25/tree-8132250_1280.jpg'}
              alt="Background"
            />

            <input type="file" accept="image/*" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
          </div>

          <Box mt={4} sx={{ maxHeight: '70vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div>
              <label htmlFor="fullname">Fullname</label>
              <TextField
                id="fullname"
                name="fullname"
                label="Fullname"
                variant="outlined"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
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
