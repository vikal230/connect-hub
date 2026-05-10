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
    setError("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName && !trimmedUserName && !trimmedEmail && !trimmedPassword) {
      setError("All fields are required to fill");
      return;
    }

    if (!trimmedName) {
      setError("Name is required");
      return;
    }

    if (!trimmedUserName) {
      setError("UserName is required");
      return;
    }

    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email");
      return;
    }

    if (!trimmedPassword) {
      setError("Password is required");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setloading(true);
    try {
      const data = await handleSignup({
        name: trimmedName,
        userName: trimmedUserName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      dispatch(setUserData(data.user));
    } catch (error) {
      const backendMessage = error.response?.data?.message || "";

      if (backendMessage.toLowerCase().includes("username already exist")) {
        setError("Username already exists, please try another username");
      } else if (backendMessage.toLowerCase().includes("email already exist")) {
        setError("Email already exists, please try another email");
      } else if (backendMessage.toLowerCase().includes("valid email address")) {
        setError("Please enter a valid email");
      } else if (backendMessage.toLowerCase().includes("password must be at least 6 characters")) {
        setError("Password must be at least 6 characters");
      } else {
        setError("Please check your signup details");
      }
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0b0b0b] flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-[#09090b] rounded-2xl flex justify-center items-center overflow-hidden shadow-2xl border border-zinc-800">
        <div className="w-full lg:w-[50%] h-full bg-[#09090b] flex flex-col items-center p-[10px] gap-[20px] overflow-y-auto">
          
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span className="bg-zinc-900 text-zinc-100 py-3 px-20 rounded-3xl border border-zinc-800 whitespace-nowrap">
              Sign Up in <span className="text-sky-500 font-bold">HYPE</span>
            </span>
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.name || name ? "top-[-20px] text-zinc-300 font-medium" : ""}`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent text-white"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.userName || userName ? "top-[-20px] text-zinc-300 font-medium" : ""}`}
            >
              Enter Your userName
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent text-white"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.email || email ? "top-[-20px] text-zinc-300 font-medium" : ""}`}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.password || password ? "top-[-20px] text-zinc-300 font-medium" : ""}`}
            >
              Enter password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 bg-transparent text-white"
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              required
            />
            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px] text-zinc-500 hover:text-zinc-100"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px] text-zinc-500 hover:text-zinc-100"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          
          {err && <p className="text-red-500 text-sm">{err}</p>}
          
          <button
            className={`w-[70%] px-[20px] py-[10px] text-black font-semibold h-[50px] rounded-2xl mt-[20px] flex justify-center items-center gap-2 ${loading ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-white hover:bg-zinc-200 cursor-pointer shadow-lg"}`}
            onClick={handleSubmitSignUp}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={25} color="white" />
            ) : (
              "Sign Up"
            )}
          </button>
          
          <p className="text-zinc-500 cursor-pointer mt-2 pb-5">
            Create Account ?{" "}
            <span
              className="text-zinc-100 font-semibold hover:text-sky-400"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#0b0b0b] border-l border-zinc-800 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px]">
          <img src={logo} alt="vite image" />
          <p className="tracking-wide text-zinc-400">We Become What We Think Abouth</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


//
