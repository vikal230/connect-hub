
import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
  
  const { handleSignIn } = useAuth();

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          message: "Login first and enjoy.",
          type: "success",
        },
      }),
    );
  };
  
  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUserName && !trimmedPassword) {
      setError("All fields are required to fill");
      return;
    }

    if (!trimmedUserName) {
      setError("UserName is required");
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(trimmedUserName)) {
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
      await handleSignIn({ userName: trimmedUserName, password: trimmedPassword });
      navigate("/");
    } catch (error) {
      console.log(error);
      const backendMessage = error.response?.data?.message || "";

      if (backendMessage.toLowerCase().includes("user not found")) {
        setError("Email not exist, please signup first");
      } else if (backendMessage.toLowerCase().includes("password is wrong")) {
        setError("Password incorrect, please enter right password");
      } else if (backendMessage.toLowerCase().includes("valid email")) {
        setError("Please enter a valid email");
      } else if (backendMessage.toLowerCase().includes("password must be at least 6 characters")) {
        setError("Password must be at least 6 characters");
      } else {
        setError("Please check your login details");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0b0b0b] flex flex-col justify-center items-center">
      
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-[#09090b] rounded-2xl flex justify-center items-center overflow-hidden shadow-2xl border border-zinc-800">
        
        <div className="w-full lg:w-[50%] h-full bg-[#09090b] flex flex-col items-center justify-center p-[10px] gap-[20px]">
          
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span className="bg-zinc-900 text-zinc-100 py-3 px-10 rounded-3xl border border-zinc-800">
              Sign In <span className="text-sky-500 font-bold">HYPE</span>
            </span>
          </div>

          {/* Input 1 */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.userName || userName ? "top-[-15px] text-zinc-300 font-medium" : ""}`}
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

          {/* Input 2 */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-zinc-800 focus-within:border-zinc-500"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-zinc-500 absolute left-[20px] p-[5px] bg-[#09090b] text-[15px] ${inputClicked.password || password ? "top-[-15px] text-zinc-300 font-medium" : ""}`}
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

          <p
            className="w-[90%] px-[20px] cursor-pointer text-sm text-zinc-500 hover:text-zinc-100 text-right"
            onClick={() => navigate("/forgot-password")}
          >
            forgot password?
          </p>
          
          {err && <p className="text-red-500 text-sm">{err}</p>}

          <button
            className={`w-[70%] px-[20px] py-[10px] text-black font-semibold h-[50px] rounded-2xl mt-[20px] flex justify-center items-center gap-2 ${loading ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-white hover:bg-zinc-200 cursor-pointer shadow-lg"}`}
            onClick={handleSubmitSignIn}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={25} color="white" />
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-zinc-500 cursor-pointer mt-2">
            Already Have An Account?{" "}
            <span
              className="text-zinc-100 font-semibold hover:text-sky-400"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#0b0b0b] border-l border-zinc-800 p-8">
          <div className="w-full h-full rounded-[28px] border border-zinc-800 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_38%),linear-gradient(180deg,#111827_0%,#09090b_100%)] flex flex-col justify-between p-8 overflow-hidden">
            <div className="space-y-3">
              <p className="text-white text-3xl font-black tracking-tight">
                Step Into Hype
              </p>
              <p className="text-zinc-400 text-sm leading-6 max-w-[320px]">
                Discover creators, chat instantly, and keep your social world active in one place.
              </p>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="relative w-[280px] min-h-[280px] rounded-[32px] border border-zinc-700/80 bg-zinc-900/80 p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-xs font-semibold">Live Activity</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-zinc-800/80 p-4">
                    <p className="text-white text-sm font-semibold">New reel trend</p>
                    <p className="text-zinc-400 text-xs mt-1">People you follow are posting right now.</p>
                  </div>
                  <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
                    <p className="text-sky-300 text-sm font-semibold">24k interactions</p>
                    <p className="text-zinc-300 text-xs mt-1">Stay connected with stories, posts, and messages.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div onClick={showLoginToast} className="rounded-2xl bg-zinc-800/70 px-3 py-2 text-center text-zinc-300 text-[11px] font-semibold cursor-pointer">Real vibes</div>
                    <div onClick={showLoginToast} className="rounded-2xl bg-zinc-800/70 px-3 py-2 text-center text-zinc-300 text-[11px] font-semibold cursor-pointer">Fast connect</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span onClick={showLoginToast} className="rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sky-300 cursor-pointer">Social first</span>
              <span onClick={showLoginToast} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 cursor-pointer">Smooth experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
