// import React, { useState } from "react";
// import { IoIosEye } from "react-icons/io";
// import { IoIosEyeOff } from "react-icons/io";
// import logo from "../assets/vite.svg";
// import { useAuth } from "../hooks/useAuth";
// import { ClipLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   //! state
//   const [inputClicked, setInputClicked] = useState({
//     userName: false,
//     password: false,
//   });
//   const [loading, setloading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [password, SetPassword] = useState("");
//   const navigate = useNavigate();
//   const [err, setError] = useState("");
//   //!destructurering
//   const { handleSignIn } = useAuth();
//   //! functions
//   const handleSubmitSignIn = async (e) => {
//     e.preventDefault();
//     setloading(true);
//     setError("");
//     try {
//       await handleSignIn({ userName, password });
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//       setError(error.response?.data?.message);
//     } finally {
//       setloading(false);
//     }
//   };
//   return (
//     <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
//       <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
//         <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20px]">
//           <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
//             <span className="bg-amber-200 text-gray-800 py-3 px-30 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
//               Sign In <span className="text-amber-600 font-bold">HYPE</span>
//             </span>
//           </div>

//           <div
//             className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
//             onClick={() => setInputClicked({ ...inputClicked, userName: true })}
//           >
//             <label
//               htmlFor="userName"
//               className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? "top-[-15px]" : ""}`}
//             >
//               Enter Your userName
//             </label>
//             <input
//               type="text"
//               id="userName"
//               className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
//               onChange={(e) => setUserName(e.target.value)}
//               value={userName}
//               required
//             />
//           </div>

//           <div
//             className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
//             onClick={() => setInputClicked({ ...inputClicked, password: true })}
//           >
//             <label
//               htmlFor="password"
//               className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-15px]" : ""}`}
//             >
//               Enter password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
//               onChange={(e) => SetPassword(e.target.value)}
//               value={password}
//               required
//             />
//             {!showPassword ? (
//               <IoIosEye
//                 className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
//                 onClick={() => setShowPassword(true)}
//               />
//             ) : (
//               <IoIosEyeOff
//                 className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
//                 onClick={() => setShowPassword(false)}
//               />
//             )}
//           </div>
//           <p
//             className="w-[90%] px-[20px] cursor-pointer"
//             onClick={() => navigate("/forgot-password")}
//           >
//             forgot password
//           </p>
//           {err && <p className="text-red-600">{err}</p>}

//           <button
//             className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] rounded-2xl mt-[30px] flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
//             onClick={handleSubmitSignIn}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <ClipLoader size={30} color="white" />
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>
//           <p className="text-gray-800 cursor-pointer">
//             Already Have An Account ?{" "}
//             <span
//               className="border-b-2 pb-[2px] border-b-black text-black"
//               onClick={() => navigate("/signup")}
//             >
//               Sign Up
//             </span>
//           </p>
//         </div>

//         <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
//           <img src={logo} alt="vite image" />
//           <p>its a vibe coding way</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import logo from "../assets/vite.svg";
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

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#0b0b0b] border-l border-zinc-800 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px]">
          <img src={logo} alt="vite image" />
          <p className="tracking-wide text-zinc-400">We Become What We Think Abouth</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
