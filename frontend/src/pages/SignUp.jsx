import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import logo from "../assets/vite.svg";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    email: false,
    userName: false,
    password: false,
  });
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { handleSignup } = useAuth();
  
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setloading(true);
    setError("");
    try {
      const data = await handleSignup({ name, userName, email, password });
      dispatch(setUserData(data.user));
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden shadow-2xl shadow-slate-200">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px] overflow-y-auto">
          
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span className="bg-indigo-50 text-slate-700 py-3 px-20 rounded-3xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
              Sign Up in <span className="text-indigo-600 font-bold">HYPE</span>
            </span>
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-slate-200 focus-within:border-indigo-500 transition-colors"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-slate-500 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all ${inputClicked.name || name ? "top-[-20px] text-indigo-600 font-medium" : ""}`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-slate-200 focus-within:border-indigo-500 transition-colors"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-slate-500 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all ${inputClicked.userName || userName ? "top-[-20px] text-indigo-600 font-medium" : ""}`}
            >
              Enter Your userName
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-slate-200 focus-within:border-indigo-500 transition-colors"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-slate-500 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all ${inputClicked.email || email ? "top-[-20px] text-indigo-600 font-medium" : ""}`}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-slate-200 focus-within:border-indigo-500 transition-colors"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-slate-500 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all ${inputClicked.password || password ? "top-[-20px] text-indigo-600 font-medium" : ""}`}
            >
              Enter password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent"
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              required
            />
            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px] text-slate-400 hover:text-indigo-600"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px] text-slate-400 hover:text-indigo-600"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          
          {err && <p className="text-red-500 text-sm">{err}</p>}
          
          <button
            className={`w-[70%] px-[20px] py-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-[50px] rounded-2xl mt-[20px] flex justify-center items-center gap-2 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer shadow-lg shadow-indigo-200"}`}
            onClick={handleSubmitSignUp}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={25} color="white" />
            ) : (
              "Sign Up"
            )}
          </button>
          
          <p className="text-slate-600 cursor-pointer mt-2 pb-5">
            Create Account ?{" "}
            <span
              className="text-indigo-600 font-semibold hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-gradient-to-br from-indigo-600 to-violet-700 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px]">
          <img src={logo} alt="vite image" className="drop-shadow-xl" />
          <p className="tracking-wide text-indigo-100">We Become What We Think Abouth</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


//