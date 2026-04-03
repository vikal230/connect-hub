const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-[999]">
      {/* Simple Standard Spinner */}
      <div className="w-10 h-10 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;