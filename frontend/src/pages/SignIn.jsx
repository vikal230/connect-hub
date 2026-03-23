import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import logo from "../assets/vite.svg";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const SignIn = () => {
  //! state
  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false,
  });
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [err, setError] = useState("");
  const dispatch = useDispatch()
  //!destructurering
  const { handleSignIn } = useAuth();
  //! functions
  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setloading(true);
    setError("");
    try {
      const data = await handleSignIn({ userName, password });
       dispatch(setUserData(data.user))
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span className="bg-amber-200 text-gray-800 py-3 px-30 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
              Sign In <span className="text-amber-600 font-bold">HYPE</span>
            </span>
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? "top-[-15px]" : ""}`}
            >
              Enter Your userName
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-15px]" : ""}`}
            >
              Enter password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              required
            />
            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          <p
            className="w-[90%] px-[20px] cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            forgot password
          </p>
          {err && <p className="text-red-600">{err}</p>}

          <button
            className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] rounded-2xl mt-[30px] flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleSubmitSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <ClipLoader size={30} color="white" />
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-gray-800 cursor-pointer">
            Already Have An Account ?{" "}
            <span
              className="border-b-2 pb-[2px] border-b-black text-black"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo} alt="vite image" />
          <p>its a vibe coding way</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
