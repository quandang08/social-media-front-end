import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none',
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === '/signup';
  const [loading, setLoading] = React.useState(false);

  // Đóng modal khi URL thay đổi
  React.useEffect(() => {
    if (open && location.pathname !== (isSignup ? '/signup' : '/signin')) {
      handleClose();
    }
  }, [location.pathname, open, handleClose, isSignup]);

  // Chuyển đổi giữa đăng nhập và đăng ký
  const handleToggleAuth = () => {
    navigate(isSignup ? '/signin' : '/signup');
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-10">
            {isSignup ? 'Create an Account' : 'Welcome Back'}
          </h1>

          {isSignup ? (
            <SignupForm loading={loading} setLoading={setLoading} />
          ) : (
            <SigninForm loading={loading} setLoading={setLoading} />
          )}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </h1>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleToggleAuth}
            sx={{ borderRadius: '29px', py: '15px' }}
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}