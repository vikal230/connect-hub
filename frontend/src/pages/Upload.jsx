import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import VideoPlayer from "../components/VideoPlayer";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import { ClipLoader } from "react-spinners";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState();
  const mediaInput = useRef();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleUploadPost, handleUploadStory, handleUploadReel } =
    usePostStoryReelHook();

  const handleUpload = async () => {
    setLoading(true);
    try {
      let res;
      if (uploadType === "post") {
        res = await handleUploadPost({
          caption,
          mediaType,
          file: backendMedia,
        });
      } else if (uploadType === "Story") {
        res = await handleUploadStory({ mediaType, file: backendMedia });
      } else if (uploadType === "Reel") {
        res = await handleUploadReel({ caption, file: backendMedia });
      }
      if (res?.success) navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-[100vh] bg-[#0b0b0b] flex flex-col items-center overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center gap-4 px-6 border-b border-zinc-900">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-7 h-7 hover:text-zinc-400 transition-colors"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-xl font-bold tracking-tight">Create New {uploadType}</h1>
      </div>

      {/* Upload Type Selector */}
      <div className="w-[90%] max-w-[500px] h-[65px] bg-zinc-900/50 p-1.5 rounded-3xl flex justify-between items-center mt-8 border border-zinc-800">
        {["post", "Story", "Reel"].map((type) => (
          <div
            key={type}
            className={`${
              uploadType === type 
                ? "bg-white text-black shadow-lg" 
                : "text-zinc-400 hover:text-white"
            } w-[32%] h-full flex justify-center items-center text-[15px] font-bold rounded-[22px] cursor-pointer transition-all duration-300`}
            onClick={() => {
              setUploadType(type);
              setFrontendMedia(null);
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>

      {/* Media Selector Box */}
      {!frontendMedia && (
        <div
          className="w-[90%] max-w-[500px] h-[300px] bg-zinc-900/30 border-zinc-800 border-2 border-dashed flex flex-col items-center justify-center gap-4 mt-12 rounded-[32px] cursor-pointer hover:bg-zinc-900/60 hover:border-zinc-700 transition-all group"
          onClick={() => mediaInput.current.click()}
        >
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <GoPlus className="text-white w-8 h-8" />
          </div>
          <input 
            type="file" 
            hidden 
            ref={mediaInput} 
            onChange={handleMedia} 
            accept={uploadType === "Reel" ? "video/*" : "image/*,video/*"}
          />
          <div className="text-zinc-300 text-lg font-semibold tracking-tight">
            Select from device
          </div>
          <p className="text-zinc-500 text-sm">Upload high quality {uploadType.toLowerCase()}s</p>
        </div>
      )}

      {/* Preview Section */}
      {frontendMedia && (
        <div className="w-[90%] max-w-[500px] flex flex-col items-center justify-center mt-12 animate-in fade-in zoom-in duration-300">
          <div className="w-full relative rounded-[32px] overflow-hidden border border-zinc-800 bg-black">
            {mediaType === "image" ? (
              <img src={frontendMedia} alt="preview" className="w-full h-auto max-h-[400px] object-contain mx-auto" />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center">
                <VideoPlayer media={frontendMedia} />
              </div>
            )}
            
            {/* Remove Media Button */}
            <button 
              onClick={() => setFrontendMedia(null)}
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 transition-colors"
            >
              <MdOutlineKeyboardBackspace className="rotate-90" />
            </button>
          </div>

          {uploadType !== "Story" && (
            <div className="w-full mt-6">
              <textarea
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl outline-none px-4 py-4 text-white placeholder-zinc-500 focus:border-sky-500 transition-colors resize-none"
                placeholder="Write a caption..."
                rows="3"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              />
            </div>
          )}

          {/* Action Button */}
          <button
            className={`w-full h-[55px] mt-8 mb-10 cursor-pointer rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2
              ${loading 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                : "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-xl"
              }`}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#000" /> : `Share ${uploadType}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;