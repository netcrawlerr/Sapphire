const CheckoutLoader = () => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-100 flex justify-center items-center z-50">
        <div className="text-white text-3xl font-semibold scale-up-down">
          Generating Report
        </div>
        <style jsx>{`
          @keyframes scale-up-down {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
          .scale-up-down {
            animation: scale-up-down 1.5s infinite;
          }
        `}</style>
      </div>
    );
  };
  
  export default CheckoutLoader;
  