import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import VideoPlayer from "../components/VideoPlayer";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
// import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState();
  const mediaInput = useRef();
  const [caption, setCaption] = useState();
  const [loading, setLoading] = useState(false);
  const { handleUploadPost, handleUploadStory, handleUploadReel } =
    usePostStoryReelHook();

  // const { postData } = useSelector((state) => state.post);
  // const { storyData } = useSelector((state) => state.story);
  // const { reelData } = useSelector((state) => state.reel);

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
    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center ">
      <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px] "
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
      </div>
      <div
        className="w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]
      "
      >
        <div
          className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>

        <div
          className={`${uploadType == "Story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl shadow-black`}
          onClick={() => setUploadType("Story")}
        >
          Story
        </div>

        <div
          className={`${uploadType == "Reel" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("Reel")}
        >
          Reel
        </div>
      </div>
      {!frontendMedia && (
        <div
          className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
          onClick={() => mediaInput.current.click()}
        >
          <GoPlus className="text-white w-[25px] cursor-pointer h-[25px]" />
          <input type="file" hidden ref={mediaInput} onChange={handleMedia} accept={uploadType == "Reel" ? "video/*" : ""}/>
          <div className="text-white text-[19px] font-semibold">
            Upload {uploadType}
          </div>
        </div>
      )}

      {frontendMedia && (
        <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]">
          {mediaType == "image" && (
            <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
              <img src={frontendMedia} alt="" className="h-[60%] rounded-2xl" />
              {uploadType != "Story" && (
                <input
                  type="text"
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                  placeholder="write caption"
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
              )}
            </div>
          )}

          {mediaType == "video" && (
            <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
              <VideoPlayer media={frontendMedia} />
              {uploadType != "Story" && (
                <input
                  type="text"
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                  placeholder="write caption"
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
              )}
            </div>
          )}
        </div>
      )}

      {frontendMedia && (
        <button
          className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl "
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <ClipLoader /> : `Upload ${uploadType}`}
        </button>
      )}
    </div>
  );
};

export default Upload;
