import React from "react";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  dateOfBirth: Yup.object().shape({
    day: Yup.number()
      .required("Required")
      .min(1, "Day must be between 1 and 31")
      .max(31, "Day must be between 1 and 31"),
    month: Yup.number()
      .required("Required")
      .min(1, "Month must be between 1 and 12")
      .max(12, "Month must be between 1 and 12"),
    year: Yup.number()
      .required("Required")
      .min(new Date().getFullYear() - 100, "Year must be valid")
      .max(new Date().getFullYear(), "Year must be valid"),
  }),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const SignupForm = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: { day: "", month: "", year: "" },
    },
    validationSchema,
    onSubmit: async (values) => {
      const { day, month, year } = values.dateOfBirth;
      const formattedValues = {
        ...values,
        dateOfBirth: `${year}-${month}-${day}`,
      };
      setLoading(true);
      setError(null);
      try {
        await dispatch(registerUser(formattedValues));
      } catch (error) {
        setError(error.message || "Đăng ký thất bại");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Hiển thị thông báo lỗi */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Các trường Full Name, Email, Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="outlined"
            size="small"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
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

        {/* Ngày sinh */}
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            name="day"
            fullWidth
            value={formik.values.dateOfBirth.day}
            onChange={handleDateChange("day")}
            error={formik.touched.dateOfBirth?.day && Boolean(formik.errors.dateOfBirth?.day)}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.dateOfBirth?.day && formik.errors.dateOfBirth?.day && (
            <FormHelperText error>{formik.errors.dateOfBirth.day}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            name="month"
            fullWidth
            value={formik.values.dateOfBirth.month}
            onChange={handleDateChange("month")}
            error={formik.touched.dateOfBirth?.month && Boolean(formik.errors.dateOfBirth?.month)}
          >
            {months.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.dateOfBirth?.month && formik.errors.dateOfBirth?.month && (
            <FormHelperText error>{formik.errors.dateOfBirth.month}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            fullWidth
            value={formik.values.dateOfBirth.year}
            onChange={handleDateChange("year")}
            error={formik.touched.dateOfBirth?.year && Boolean(formik.errors.dateOfBirth?.year)}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.dateOfBirth?.year && formik.errors.dateOfBirth?.year && (
            <FormHelperText error>{formik.errors.dateOfBirth.year}</FormHelperText>
          )}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} className="mt-4">
          <Button
            sx={{ borderRadius: "29px", py: "12px", bgcolor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;