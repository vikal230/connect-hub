// import React from "react";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ReelCard from "../components/ReelCard";
// const Reels = () => {
//   const { reelData } = useSelector((state) => state.reel);
//   const navigate = useNavigate();
//   return (
//     <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
//       <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100]">
//         <MdOutlineKeyboardBackspace
//           className="text-white cursor-pointer w-[25px] h-[25px] "
//           onClick={() => navigate(`/`)}
//         />
//         <h1 className="text-white text-[20px] font-semibold">Reels</h1>
//       </div>

//       <div className="h-[100vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
//         {" "}
//         {reelData.map((reel, index) => (
//           <div className="h-screen snap-start">
//             {" "}
//             <ReelCard reel={reel} key={index} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Reels;



import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReelCard from "../components/ReelCard";

const Reels = () => {
  const { reelData } = useSelector((state) => state.reel);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
      <div className="w-full h-[70px] flex items-center gap-4 px-6 fixed top-0 left-0 z-[100] bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px]">
        <div 
          className="p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer active:scale-90"
          onClick={() => navigate(`/`)}
        >
          <MdOutlineKeyboardBackspace className="text-white w-7 h-7" />
        </div>
        <h1 className="text-white text-xl font-black tracking-tighter shadow-black drop-shadow-md">Reels</h1>
      </div>

      <div className="h-screen w-full lg:w-[480px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {reelData.map((reel, index) => (
          <div key={reel._id || index} className="h-screen snap-start relative">
            <ReelCard reel={reel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;