import React, { useEffect, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Loader from "../components/Loader";

const SignUp = () => {
  const [pageLoading, setPageLoading] = useState(true);
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

  const showRegisterToast = () => {
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          message: "Register first and enjoy.",
          type: "success",
        },
      }),
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) return <Loader />;
  
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

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#0b0b0b] border-l border-zinc-800 p-8">
          <div className="w-full h-full rounded-[28px] border border-zinc-800 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_38%),linear-gradient(180deg,#111827_0%,#09090b_100%)] flex flex-col justify-between p-8 overflow-hidden">
            <div className="space-y-3">
              <p className="text-white text-3xl font-black tracking-tight">
                Join The Hype
              </p>
              <p className="text-zinc-400 text-sm leading-6 max-w-[320px]">
                Create your profile, share your moments, and build a feed that feels fresh every day.
              </p>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="relative w-[280px] min-h-[280px] rounded-[32px] border border-zinc-700/80 bg-zinc-900/80 p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-xs font-semibold">Create Space</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-zinc-800/80 p-4">
                    <p className="text-white text-sm font-semibold">Build your profile</p>
                    <p className="text-zinc-400 text-xs mt-1">Add your identity and start sharing your style.</p>
                  </div>
                  <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
                    <p className="text-sky-300 text-sm font-semibold">Stories, posts, reels</p>
                    <p className="text-zinc-300 text-xs mt-1">Everything you need to stay visible and connected.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div onClick={showRegisterToast} className="rounded-2xl bg-zinc-800/70 px-3 py-2 text-center text-zinc-300 text-[11px] font-semibold cursor-pointer">Create profile</div>
                    <div onClick={showRegisterToast} className="rounded-2xl bg-zinc-800/70 px-3 py-2 text-center text-zinc-300 text-[11px] font-semibold cursor-pointer">Start sharing</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span onClick={showRegisterToast} className="rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sky-300 cursor-pointer">Fresh profile</span>
              <span onClick={showRegisterToast} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 cursor-pointer">Real network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


//
