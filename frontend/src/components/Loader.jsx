import { useLocation } from "react-router-dom";

const Loader = () => {
  const { pathname } = useLocation();

  const getLoadingText = () => {
    if (pathname === "/signin") return "Loading Sign In...";
    if (pathname === "/signup") return "Loading Sign Up...";
    if (pathname === "/forgot-password") return "Loading Forgot Password...";
    if (pathname.startsWith("/profile/")) return "Loading Profile...";
    if (pathname === "/reels") return "Loading Reels...";
    if (pathname === "/upload") return "Loading Upload...";
    if (pathname === "/editprofile") return "Loading Edit Profile...";
    if (pathname === "/messages") return "Loading Messages...";
    if (pathname === "/messagearea") return "Loading Message Area...";
    if (pathname === "/search") return "Loading Search...";
    if (pathname === "/notificationpage") return "Loading Notifications...";
    if (pathname.startsWith("/story/")) return "Loading Story...";
    return "Loading Home...";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b0b0b] z-[999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-sky-500 rounded-full animate-spin"></div>
        <p className="text-zinc-200 text-sm font-medium tracking-wide">
          {getLoadingText()}
        </p>
      </div>
    </div>
  );
};

export default Loader;
