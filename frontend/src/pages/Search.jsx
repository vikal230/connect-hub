// import React, { useEffect } from "react";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { TbSearch } from "react-icons/tb";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useAuth } from "../hooks/useAuth";
// import OtherUser from "../components/OtherUser";

// const Search = () => {
//   const navigate = useNavigate();
//   const [input, setInput] = useState("");
//   const { searchData } = useSelector((state) => state.user);
//   const { handleSearchUser } = useAuth();

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     try {
//       await handleSearchUser(input);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       handleSearchUser(input);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [input]);

//   return (
//     <div className="w-full bg-black min-h-[100vh] flex items-center flex-col gap-[20px] px-[20px] pb-[30px]">
//       <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] absolute top-0">
//         <MdOutlineKeyboardBackspace
//           className="text-white cursor-pointer w-[25px] h-[25px]"
//           onClick={() => navigate("/")}
//         />
//       </div>
//       <div className="w-full h-[80px] flex items-center justify-center mt-[80px]">
//         <form
//           className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center gap-[10px] px-[20px]"
//           onSubmit={handleSearch}
//         >
//           <TbSearch className="w-[20px] h-[20px] text-white" />
//           <input
//             type="text"
//             placeholder="Search Here..."
//             className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px] bg-transparent"
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//           />

//         </form>
//       </div>

//       <div className="w-full max-w-[800px] flex flex-col gap-[10px]">
//         {searchData?.map((user, index) => (
//           <OtherUser key={user._id || index} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import dp from "../assets/dp.png";

const Search = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { searchData } = useSelector((state) => state.user);
  const { handleSearchUser } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await handleSearchUser(input);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchUser(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="w-full bg-black min-h-[100vh] flex items-center flex-col gap-[20px] px-[20px] pb-[30px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] absolute top-0">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="w-full h-[80px] flex items-center justify-center mt-[80px]">
        <form
          className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center gap-[10px] px-[20px]"
          onSubmit={handleSearch}
        >
          <TbSearch className="w-[20px] h-[20px] text-white" />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px] bg-transparent"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </form>
      </div>

      {input && (
        <div className="w-full max-w-[800px] flex flex-col gap-[10px]">
          {searchData?.map((user, index) => (
            <div
              key={user._id || index}
              onClick={() => navigate(`/profile/${user.userName}`)} // Click karne par profile par jayega
              className="flex items-center gap-[15px] w-full p-[10px] rounded-xl hover:bg-[#1a1f1f] cursor-pointer transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-800">
                <img
                  src={user?.profileImage || dp}
                  alt="user dp"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-white font-semibold text-[16px]">
                  {user?.userName}
                </p>
                <p className="text-gray-400 text-[14px]">{user?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!input && (
        <div className="flex h-[50vh] w-full justify-center items-center">
          <h1 className="text-gray-500 text-[20px] font-semibold">
            Find your Friends Here...
          </h1>
        </div>
      )}
    </div>
  );
};

export default Search;
