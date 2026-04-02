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
import {usePostStoryReelHook} from "../hooks/usePostStoryReelHook"
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
  // useEffect(() => {
  //   handleGetProfile(userName);
  // }, [userName]);


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
    <div className="w-full min-h-screen bg-black">
      {/* Top Header */}
      <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white">
        <div>
          <MdOutlineKeyboardBackspace
            className="text-white w-[25px] h-[25px]"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="font-semibold text-[20px]">{profileData?.userName}</div>
        <div className="text-blue-700 cursor-pointer" onClick={handleLogOut}>
          Log Out
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      {/* Stats Section (Posts, Followers, Following) */}
      <div className="w-full flex items-center justify-center gap-[30px] md:gap-[60px] mt-[20px] px-[10%] text-white">
        {/* Posts */}
        <div className="flex flex-col items-center">
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts?.length || 0}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>

        {/* Followers */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-[10px]">
            {/* Stacked Images Container */}
            <div className="flex relative w-[60px] h-[40px]">
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div
                  key={user?._id || index}
                  className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden z-30 absolute"
                  style={{ left: `${index * 9}px` }}
                >
                  <img
                    src={user?.profileImage || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.followers?.length || 0}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>

        {/* Following */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-[10px]">
            <div className="flex relative w-[60px] h-[40px]">
              {profileData?.following?.slice(0, 3).map((user, index) => (
                <div
                  key={user?._id || index}
                  className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden z-30 absolute"
                  style={{ left: `${index * 9}px` }}
                >
                  <img
                    src={user?.profileImage || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following?.length || 0}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData?._id && profileData?._id === userData?._id && (
          <button
            className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}

        {profileData?._id && profileData?._id !== userData?._id && (
          <>
            {/* <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl">
              Follow
            </button> */}
            <FollowButton
              tailwind={
                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
              }
              targetUserId={profileData._id}
              onSuccess={refreshProfile}
            />
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl" onClick={()=> {
              dispatch(setSelectedUser(profileData))
              navigate("/messagearea")
            }}>
              Message
            </button>
          </>
        )}
      </div>

      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] px-[20px] pb-[30px] mb-[50px]">
       
       {profileData?._id === userData?._id &&    <div
            className="w-[60%] max-w-[400px] h-[80px] bg-white rounded-full flex justify-center items-center gap-[10px]
      "
          >
            <div
              className={`${postType == "posts" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
              onClick={() => setPostType("posts")}
            >
              Posts
            </div>

            <div
              className={`${postType == "saved" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl shadow-black`}
              onClick={() => setPostType("saved")}
            >
              Saved
            </div>
          </div>}

          <Nav />

          {profileData?._id === userData?._id && (
            <>
              {postType == "posts" &&
                postData
                  .filter(
                    (post) =>
                      String(post?.author?._id || "") ===
                      String(profileData?._id || ""),
                  )
                  .map((post) => <Post key={post?._id} postData={post} />)}

              {postType == "saved" &&
                userData?.saved?.map((savedPost, index) => {

                  const completePost =
                    postData.find(
                      (p) => String(p._id) === String(savedPost._id),
                    ) || savedPost;

                  return (
                    <Post
                      key={completePost._id || index}
                      postData={completePost}
                    />
                  );
                })}
            </>
          )}

        {profileData?._id != userData?._id && (
            postData.map((post, index) => (
              post.author?._id == profileData?._id && <Post postData={post} key={index}/>
            ))
           
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
