import React, { useState } from "react";
import { Button, Divider, TextField, Dialog } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
import SigninForm from "./SigninForm";

const Authentication = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Ảnh bên trái */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E12AQGLS4QArZi_AQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520111348676?e=2147483647&v=beta&t=3f31nzUwPKs1AOo_QsliF0X9jryyk8Xweq81Z548CEI"
          className="w-full h-full object-cover"
          alt="Register"
        />
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-xl font-bold">Bring your ideas to life.</h3>
          <p className="text-sm">
            Sign up for free and enjoy access to all features for 30 days.
          </p>
        </div>
      </div>

      {/* Form bên phải */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-2xl font-bold">
            <span className="font-bold italic">CubeFactory</span>
          </h1>

          <h2 className="text-3xl font-bold mt-4">Sign up now</h2>
          <p className="text-gray-500 mb-6">Create a free account</p>

          {/* Nút đăng ký với Google */}
          <GoogleLogin
            onSuccess={(response) => {
              console.log("Google Sign-In Success:", response);
              alert("Signed in successfully!");
            }}
            onError={() => {
              console.log("Google Sign-In Failed");
              alert("Failed to sign in with Google");
            }}
          />

          <Divider className="mb-4">or</Divider>

          {/* Form đăng ký */}
          <form className="space-y-4">
            <TextField fullWidth label="Email address" variant="outlined" />
            <TextField fullWidth label="Password" variant="outlined" type="password" />
            <TextField fullWidth label="Repeat password" variant="outlined" type="password" />
            <Button fullWidth variant="contained" color="primary">
              Sign up
            </Button>
          </form>

          {/* Nút Sign in mở modal */}
          <p className="text-center mt-6">
            Already have an account?{" "}
            <button onClick={() => setOpen(true)} className="text-blue-600 underline">
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Modal đăng nhập */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <SigninForm onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

export default Authentication;
