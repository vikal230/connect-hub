const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b0b0b] z-[999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-sky-500 rounded-full animate-spin"></div>
        <p className="text-zinc-200 text-sm font-medium tracking-wide">
          Loading your vibe...
        </p>
      </div>
    </div>
  );
};

export default Loader;
