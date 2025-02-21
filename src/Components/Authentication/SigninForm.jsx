import React from "react";
import { Button, TextField, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";

const SigninForm = ({ onClose }) => {
  return (
    <Box sx={{ width: 380, padding: "24px", borderRadius: "12px" }}>
      {/* Tiêu đề */}
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600, fontSize: "22px", paddingBottom: "8px" }}>
        Welcome Back
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Input Email */}
        <TextField
          fullWidth
          label="Email Address"
          placeholder="example@gmail.com"
          variant="outlined"
          margin="dense"
          sx={{ borderRadius: "8px" }}
        />

        {/* Input Password */}
        <TextField
          fullWidth
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          margin="dense"
          type="password"
          sx={{ borderRadius: "8px" }}
        />
      </DialogContent>

      {/* Hành động */}
      <DialogActions sx={{ justifyContent: "space-between", padding: "16px 24px 8px" }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: "#555",
            borderRadius: "8px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 20px",
            borderRadius: "8px",
          }}
        >
          Sign In
        </Button>
      </DialogActions>
    </Box>
  );
};

export default SigninForm;
