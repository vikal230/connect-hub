// import React from 'react'

// const Post = ({postData}) => {
//   return (
//     <div>
//       {postData.caption}
//     </div>
//   )
// }

// export default Post

import React from "react";
import { GoHeart, GoComment, GoBookmark } from "react-icons/go";
import VideoPlayer from "./VideoPlayer";

const Post = ({ postData }) => {
  return (
    <div className="w-full max-w-[480px] bg-white rounded-[35px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] p-[15px] flex flex-col gap-[12px]">
      {/* Header: User Profile & Follow */}
      <div className="flex items-center justify-between w-full px-1">
        <div className="flex items-center gap-3">
          <img
            src={
              postData.author?.profileImage || "https://via.placeholder.com/150"
            }
            className="w-[45px] h-[45px] rounded-full object-cover border-2 border-pink-500 p-[2px]"
            alt="profile"
          />
          <span className="font-bold text-[15px]">
            {postData.author?.userName || "user"}
          </span>
        </div>
        <button className="bg-black text-white px-5 py-1.5 rounded-full text-[13px] font-semibold hover:opacity-80 transition-all">
          Follow
        </button>
      </div>

      {/* Media Section: The "Card" Look */}
      <div className="w-full bg-gray-50 rounded-[30px] overflow-hidden flex items-center justify-center">
        {postData.mediaType === "video" ? (
          <VideoPlayer media={postData.media} />
        ) : (
          <img
            src={postData.media}
            className="w-full h-auto max-h-[600px] object-contain"
            alt="post content"
          />
        )}
      </div>

      {/* Interactions & Caption */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <GoHeart className="text-[24px] text-red-500" />
              <span className="text-[14px] font-medium">2</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <GoComment className="text-[24px]" />
              <span className="text-[14px] font-medium">4</span>
            </div>
          </div>
          <GoBookmark className="text-[24px] cursor-pointer" />
        </div>

        {/* Caption */}
        <div className="text-[14px] mt-1">
          <span className="font-bold mr-2">{postData.author?.userName}</span>
          <span className="text-gray-700">
            {postData.caption || "No caption provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
