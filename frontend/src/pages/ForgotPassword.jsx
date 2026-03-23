import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    consfirmNewPassword: false,
  });
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [err, setError] = useState("");
  const [confirmNewPassword, setConfirmnewPassword] = useState("");
  const { handleSendOtp, handleIsVerify, handleResetPassword } = useAuth();

  const handleSendOtpStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await handleSendOtp({ email });
      console.log(data);
      setStep(2);
    } catch (error) {
      console.log(error);
       setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIsVerify2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
    try {
      const data = await handleIsVerify({ email, otp });
      console.log(data);
      setStep(3);
    } catch (error) {
      console.log(error);
       setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword3 = async (e) => {
    e.preventDefault();
    setError("")
    try {
      const data = await handleResetPassword({ email, password: newPassword });
      if(newPassword !== confirmNewPassword){
        return setError("Password Does Not Match")
      }
      setLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error);
       setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-start w-[90%] mt-[30px] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-15px]" : ""}`}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          {err && <p className="text-red-600">{err}</p>}

          <button
            className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] rounded-2xl mt-[30px] flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
            onClick={handleSendOtpStep1}
          >
            {loading ? (
              <>
                <ClipLoader size={30} color="white" />
              </>
            ) : (
              "Send Otp"
            )}
          </button>
        </div>
      )}
      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-start w-[90%] mt-[30px] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? "top-[-20px]" : ""}`}
            >
              Enter Otp
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
          </div>
          {err && <p className="text-red-600">{err}</p>}

          <button
            className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] rounded-2xl mt-[30px] flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
            onClick={handleIsVerify2}
          >
            {loading ? (
              <>
                <ClipLoader size={30} color="white" />
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          <div
            className="relative flex items-center justify-start w-[90%] mt-[30px] h-[50px] rounded-2xl border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? "top-[-20px]" : ""}`}
            >
              Enter NewPassword
            </label>
            <input
              type="text"
              id="newpassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] mt-[30px] h-[50px] rounded-2xl border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, confirmNewPassword: true })
            }
          >
            <label
              htmlFor="confirmNewPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmNewPassword ? "top-[-20px]" : ""}`}
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmNewPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setConfirmnewPassword(e.target.value)}
              value={confirmNewPassword}
              required
            />
          </div>
          {err && <p className="text-red-600">{err}</p>}

          <button
            className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] rounded-2xl mt-[30px] flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
            onClick={handleResetPassword3}
          >
            {loading ? (
              <>
                <ClipLoader size={30} color="white" />
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
