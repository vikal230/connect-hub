import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.png";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { handleEditProfile } = useAuth();
  const imageInput = useRef();

  const [name, setName] = useState(userData?.name || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState(userData?.bio || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || dp,
  );
  const [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleUserEditProfile = async () => {
    setLoading(true);
    try {
      const data = await handleEditProfile({
        name,
        userName,
        profession,
        gender,
        bio,
        file: backendImage,
      });
      navigate(`/profile/${data?.user?.userName || userName}`);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] flex flex-col items-center pb-10 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="w-full h-[70px] flex items-center gap-4 px-6 sticky top-0 bg-[#0b0b0b]/80 backdrop-blur-md z-50 border-b border-zinc-900">
        <div className="p-2 hover:bg-zinc-900 rounded-full transition-all cursor-pointer">
          <MdOutlineKeyboardBackspace
            className="text-white w-7 h-7"
            onClick={() => navigate(`/profile/${userData.userName}`)}
          />
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">Edit Profile</h1>
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <div
          className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-zinc-700 to-zinc-900 shadow-2xl cursor-pointer group"
          onClick={() => imageInput.current.click()}
        >
          <div className="w-full h-full rounded-full border-4 border-[#0b0b0b] overflow-hidden">
            <img
              src={frontendImage}
              alt="Profile"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-white text-[10px] font-bold uppercase tracking-tighter text-center px-2">Change Photo</span>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            hidden
            onChange={handleImage}
          />
        </div>
        <button 
          className="text-sky-500 text-sm font-bold hover:text-sky-400 transition-colors"
          onClick={() => imageInput.current.click()}
        >
          Change Profile Photo
        </button>
      </div>

      {/* Input Fields Section */}
      <div className="w-full max-w-[500px] flex flex-col gap-6 px-6 mt-10">
        
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-2">Full Name</label>
          <input
            type="text"
            className="w-full h-[55px] bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white font-medium px-5 outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Username Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-2">Username</label>
          <input
            type="text"
            className="w-full h-[55px] bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white font-medium px-5 outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all"
            placeholder="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-2">Bio</label>
          <input
            type="text"
            className="w-full h-[55px] bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white font-medium px-5 outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Profession Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-2">Profession</label>
          <input
            type="text"
            className="w-full h-[55px] bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white font-medium px-5 outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all"
            placeholder="Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        {/* Gender Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-2">Gender</label>
          <input
            type="text"
            className="w-full h-[55px] bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white font-medium px-5 outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button 
          className={`w-full h-[55px] mt-4 font-bold rounded-[20px] transition-all flex items-center justify-center
            ${loading 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-xl shadow-white/5"
            }`} 
          onClick={handleUserEditProfile}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="black" /> : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;