import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState(userData?.bio || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || dp,
  );
  const [backendImage, setBackendImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleUserEditProfile = async () => {
    setLoading(true)
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
    } finally{
      setLoading(false)
    }
  };
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] ">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px] "
          onClick={() => navigate(`/profile/${userData.userName}`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
      <div
        className="w-[80px] h-[80px] md:w-[80px] md:h-[80px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img
          src={frontendImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="text-blue-500 text-center text-[18px] font-semibold"
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Profession"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <button className="w-[90%] max-w-[600px] h-[50px] bg-white text-black font-bold cursor-pointer rounded-2xl mt-[10px]" onClick={handleUserEditProfile}>
       {loading ? <ClipLoader size={30} color="black"/> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;
