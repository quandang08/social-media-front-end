import React from 'react';
import { Grid, TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { blue } from '@mui/material/colors';
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const SigninForm = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(loginUser(values)); // Dispatch action đăng nhập
      } catch (error) {
        setError(error.message || "Đăng nhập thất bại");
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Hiển thị thông báo lỗi */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Trường email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        {/* Trường mật khẩu */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        {/* Nút submit */}
        <Grid item xs={12} className="mt-4">
          <Button
            sx={{ borderRadius: "29px", py: "12px", bgcolor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading} // Disable nút khi loading
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
