const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-5 w-4 border-t-4 border-b-4 border-amber-500"></div>
    </div>
  );
};
export default Loader;