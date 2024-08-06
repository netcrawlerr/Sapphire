const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-85 flex justify-center items-center z-50">
      <div className="spinner border-t-4 border-sky-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
