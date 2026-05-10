import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";
import { MdOutlineMailOutline, MdLockOutline, MdOutlineVpnKey } from "react-icons/md";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
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
      await handleSendOtp({ email });
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleIsVerify2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await handleIsVerify({ email, otp });
      setStep(3);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword3 = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmNewPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    try {
      await handleResetPassword({ email, password: newPassword });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset");
    } finally {
      setLoading(false);
    }
  };

  // Common Card Classes for
  const cardClasses = "w-[90%] max-w-[450px] bg-[#09090b] rounded-[35px] flex justify-center items-center flex-col border border-zinc-800 p-10 shadow-2xl";
  // Common Input Group Classes
  const inputGroupClasses = "relative flex items-center justify-start w-full h-[55px] rounded-2xl border border-zinc-800 bg-zinc-900/50 group focus-within:border-zinc-500";
  // Common Input Classes
  const inputClasses = "w-full h-full rounded-2xl px-5 pl-12 outline-none bg-transparent text-white font-medium placeholder:text-zinc-600";
  // Common Icon Classes
  const iconClasses = "absolute left-4 text-zinc-500 text-xl group-focus-within:text-white";
  // Common Label Classes
  const labelClasses = "text-zinc-500 text-xs font-bold uppercase tracking-widest absolute -top-6 left-2";

  return (
    <div className="w-full h-screen bg-[#0b0b0b] flex flex-col justify-center items-center px-6">
      
      {step === 1 && (
        <div className={cardClasses}>
          <h2 className="text-3xl font-black text-zinc-100 tracking-tighter mb-10">Forgot Password</h2>
          
          <div className="w-full flex flex-col gap-8">
            <div className="relative w-full">
              <label className={labelClasses}>Email Address</label>
              <div className={inputGroupClasses}>
                <MdOutlineMailOutline className={iconClasses} />
                <input
                  type="email"
                  id="email"
                  className={inputClasses}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            {err && <p className="text-red-500 text-sm font-bold text-center">{err}</p>}

            <button
              className={`w-full h-[55px] font-bold rounded-2xl flex justify-center items-center gap-2 ${loading ? "bg-zinc-800 text-zinc-500" : "bg-white text-black hover:bg-zinc-200 shadow-xl"}`}
              disabled={loading}
              onClick={handleSendOtpStep1}
            >
              {loading ? <ClipLoader size={24} color="black" /> : "Send OTP"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={cardClasses}>
          <h2 className="text-3xl font-black text-zinc-100 tracking-tighter mb-10">Verify OTP</h2>
          
          <div className="w-full flex flex-col gap-8">
            <div className="relative w-full">
              <label className={labelClasses}>Verification Code</label>
              <div className={inputGroupClasses}>
                <MdOutlineVpnKey className={iconClasses} />
                <input
                  type="text"
                  id="otp"
                  className={`${inputClasses} tracking-[10px] text-center pl-5 font-black placeholder:tracking-normal placeholder:font-medium`}
                  placeholder="000000"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required
                />
              </div>
            </div>

            {err && <p className="text-red-500 text-sm font-bold text-center">{err}</p>}

            <button
              className={`w-full h-[55px] font-bold rounded-2xl flex justify-center items-center gap-2 ${loading ? "bg-zinc-800 text-zinc-500" : "bg-white text-black hover:bg-zinc-200 shadow-xl"}`}
              disabled={loading}
              onClick={handleIsVerify2}
            >
              {loading ? <ClipLoader size={24} color="black" /> : "Verify & Proceed"}
            </button>
            <button onClick={() => setStep(1)} className="text-zinc-500 text-xs font-bold hover:text-zinc-100 -mt-4">Back to Email</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={cardClasses}>
          <h2 className="text-3xl font-black text-zinc-100 tracking-tighter mb-10">New Password</h2>
          
          <div className="w-full flex flex-col gap-8">
            <div className="relative w-full">
              <label className={labelClasses}>New Password</label>
              <div className={inputGroupClasses}>
                <MdLockOutline className={iconClasses} />
                <input
                  type="password"
                  id="newPassword"
                  className={inputClasses}
                  placeholder="••••••••"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
              </div>
            </div>

            <div className="relative w-full">
              <label className={labelClasses}>Confirm Password</label>
              <div className={inputGroupClasses}>
                <MdLockOutline className={iconClasses} />
                <input
                  type="password"
                  id="confirmNewPassword"
                  className={inputClasses}
                  placeholder="••••••••"
                  onChange={(e) => setConfirmnewPassword(e.target.value)}
                  value={confirmNewPassword}
                  required
                />
              </div>
            </div>

            {err && <p className="text-red-500 text-sm font-bold text-center">{err}</p>}

            <button
              className={`w-full h-[55px] font-bold rounded-2xl flex justify-center items-center gap-2 ${loading ? "bg-zinc-800 text-zinc-500" : "bg-white text-black hover:bg-zinc-200 shadow-xl"}`}
              disabled={loading}
              onClick={handleResetPassword3}
            >
              {loading ? <ClipLoader size={24} color="black" /> : "Reset Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
