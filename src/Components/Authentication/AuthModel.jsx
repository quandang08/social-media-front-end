import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Fade } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const [loading, setLoading] = useState(false);

  // Tự động đóng modal nếu đường dẫn thay đổi
  useEffect(() => {
    if (open && !["/signin", "/signup"].includes(location.pathname)) {
      handleClose();
    }
  }, [location.pathname, open, handleClose]);

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <h1 className="text-center font-bold text-3xl pb-10">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h1>

          {isSignup ? (
            <SignupForm loading={loading} setLoading={setLoading} />
          ) : (
            <SigninForm loading={loading} setLoading={setLoading} />
          )}

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(isSignup ? "/signin" : "/signup")}
            sx={{ borderRadius: "29px", py: "15px", mt: 2 }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
