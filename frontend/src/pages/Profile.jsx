import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.png";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import { setSelectedUser } from "../redux/messageSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userName } = useParams();
  const { handleGetProfile, handleLogOut } = useAuth();
  const [postType, setPostType] = useState("posts");
  const { profileData, userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const { handleFetchedAllpost } = usePostStoryReelHook();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProfile(userName);
    if (!postData || postData.length === 0) {
      handleFetchedAllpost();
    }
  }, [userName]);

  const refreshProfile = async () => {
    await handleGetProfile(userName);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] overflow-x-hidden no-scrollbar">
      {/* Top Header */}
      <div className="w-full h-[70px] flex justify-between items-center px-6 sticky top-0 bg-[#0b0b0b]/80 backdrop-blur-md z-50 border-b border-zinc-900">
        <div className="p-2 hover:bg-zinc-900 rounded-full transition-all cursor-pointer">
          <MdOutlineKeyboardBackspace
            className="text-white w-7 h-7"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="font-bold text-lg text-zinc-100 tracking-tight">
          {profileData?.userName}
        </div>
        {profileData?._id === userData?._id ? (
          <div 
            className="text-red-500 font-bold text-sm cursor-pointer hover:text-red-400 transition-colors" 
            onClick={handleLogOut}
          >
            Log Out
          </div>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Profile Info Section */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 py-10 px-6 max-w-[900px] mx-auto">
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-zinc-700 to-zinc-900 shadow-2xl">
          <img
            src={profileData?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-[#0b0b0b]"
          />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <h2 className="font-black text-2xl md:text-3xl text-white tracking-tighter">
            {profileData?.name}
          </h2>
          <span className="px-3 py-1 bg-zinc-900 text-sky-500 rounded-full text-xs font-bold uppercase tracking-widest border border-zinc-800">
            {profileData?.profession || "Member"}
          </span>
          <p className="text-zinc-400 text-sm md:text-base max-w-[400px] leading-relaxed font-medium">
            {profileData?.bio || "No bio yet."}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full flex items-center justify-center gap-8 md:gap-16 py-6 border-y border-zinc-900/50 bg-zinc-900/10">
        {/* Posts */}
        <div className="flex flex-col items-center group cursor-default">
          <span className="text-white text-xl md:text-2xl font-black">{profileData?.posts?.length || 0}</span>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Posts</span>
        </div>

        {/* Followers */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="flex items-center gap-2">
             <div className="flex -space-x-3 overflow-hidden">
                {profileData?.followers?.slice(0, 3).map((user, index) => (
                  <img
                    key={user?._id || index}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b0b0b] object-cover"
                    src={user?.profileImage || dp}
                    alt=""
                  />
                ))}
              </div>
              <span className="text-white text-xl md:text-2xl font-black">{profileData?.followers?.length || 0}</span>
          </div>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Followers</span>
        </div>

        {/* Following */}
        <div className="flex flex-col items-center group cursor-pointer">
           <div className="flex items-center gap-2">
             <div className="flex -space-x-3 overflow-hidden">
                {profileData?.following?.slice(0, 3).map((user, index) => (
                  <img
                    key={user?._id || index}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b0b0b] object-cover"
                    src={user?.profileImage || dp}
                    alt=""
                  />
                ))}
              </div>
              <span className="text-white text-xl md:text-2xl font-black">{profileData?.following?.length || 0}</span>
          </div>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Following</span>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="w-full flex justify-center gap-4 py-8">
        {profileData?._id && profileData?._id === userData?._id && (
          <button
            className="w-[180px] h-[45px] bg-zinc-100 text-black font-bold rounded-2xl hover:bg-white active:scale-95 transition-all shadow-lg"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}

        {profileData?._id && profileData?._id !== userData?._id && (
          <>
            <FollowButton
              tailwind={"w-[140px] h-[45px] bg-white text-black font-bold rounded-2xl active:scale-95 transition-all shadow-lg"}
              targetUserId={profileData._id}
              onSuccess={refreshProfile}
            />
            <button
              className="w-[140px] h-[45px] bg-zinc-900 text-white font-bold rounded-2xl border border-zinc-800 hover:bg-zinc-800 active:scale-95 transition-all"
              onClick={() => {
                dispatch(setSelectedUser(profileData));
                navigate("/messagearea");
              }}
            >
              Message
            </button>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[50px] bg-[#fafafa] min-h-[600px] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] pt-8 pb-20 px-4 mb-0">
          
          {profileData?._id === userData?._id && (
            <div className="w-full max-w-[350px] h-[55px] bg-zinc-200/50 p-1 rounded-full flex items-center mb-6">
              <div
                className={`${postType === "posts" ? "bg-black text-white shadow-xl" : "text-zinc-500"} flex-1 h-full flex justify-center items-center text-sm font-bold rounded-full cursor-pointer transition-all duration-300`}
                onClick={() => setPostType("posts")}
              >
                My Posts
              </div>
              <div
                className={`${postType === "saved" ? "bg-black text-white shadow-xl" : "text-zinc-500"} flex-1 h-full flex justify-center items-center text-sm font-bold rounded-full cursor-pointer transition-all duration-300`}
                onClick={() => setPostType("saved")}
              >
                Saved
              </div>
            </div>
          )}

          <div className="mb-8 w-full flex justify-center">
             <Nav />
          </div>

          <div className="w-full max-w-[550px] flex flex-col gap-10">
            {profileData?._id === userData?._id ? (
              <>
                {postType === "posts" &&
                  postData
                    .filter((post) => String(post?.author?._id || "") === String(profileData?._id || ""))
                    .map((post) => <Post key={post?._id} postData={post} />)}

                {postType === "saved" &&
                  userData?.saved?.map((savedPost, index) => {
                    const completePost = postData.find((p) => String(p._id) === String(savedPost._id)) || savedPost;
                    return <Post key={completePost._id || index} postData={completePost} />;
                  })}
              </>
            ) : (
              postData
                .filter((post) => String(post.author?._id) === String(profileData?._id))
                .map((post, index) => <Post postData={post} key={index} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;