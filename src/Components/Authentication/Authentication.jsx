import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import AuthModal from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false)
  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false)
  return (
    <div className="h-screen flex">
      {/* Ảnh bên trái */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-900 to-indigo-800 relative">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E12AQGLS4QArZi_AQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520111348676?e=2147483647&v=beta&t=3f31nzUwPKs1AOo_QsliF0X9jryyk8Xweq81Z548CEI"
          className="w-full h-full object-cover opacity-80"
          alt="Register"
        />
        <div className="absolute bottom-8 left-8 text-white space-y-2">
          <h3 className="text-xl font-bold">Bring your ideas to life.</h3>
          <p className="text-sm opacity-80">
            Sign up for free and enjoy access to all features for 30 days.
          </p>
        </div>
      </div>

      {/* Form bên phải */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Stay Connected</h1>
          <p className="text-xl font-medium text-gray-600 mb-8">Start your journey today</p>

          {/* Đăng nhập với Google */}
          <div className="w-full  rounded-full border border-gray-300 shadow hover:bg-gray-100 transition">
            <GoogleLogin
              onSuccess={(response) => console.log("Login Success:", response)}
              onError={() => console.log("Login Failed")}
              size="large"
              text="signin_with"
              shape="pill"
              theme="outline"
            />
          </div>

          <div className="relative text-gray-500 my-5">
            <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-t w-full"></span>
            <span className="bg-white px-3 text-sm font-semibold relative">OR</span>
          </div>

          {/* Nút tạo tài khoản */}
          <button onClick={handleOpenAuthModel}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition mb-4 shadow-lg">
            CREATE ACCOUNT
          </button>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            By signing up, you agree to the <span className="text-blue-500">Terms of Servic e</span> and <span className="text-blue-500">Privacy Policy</span>, including Cookie Use.
          </p>

          {/* Đăng nhập nếu đã có tài khoản */}
          <p className="text-gray-700 font-medium">Already have an account?</p>
          <button onClick={handleOpenAuthModel} className="w-full border border-gray-300 py-3 rounded-full mt-3 text-lg hover:bg-gray-100 transition shadow">
            SIGN IN
          </button>
        </div>
      </div>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
