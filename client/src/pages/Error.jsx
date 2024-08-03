// import { useRef, useEffect } from "react";
// import { useReactToPrint } from "react-to-print";
// import React from "react";

// const Error = () => {
//   const reff = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => reff.current,
//   });

//   // Automatically trigger the print when the component mounts
//   useEffect(() => {
//     handlePrint();
//   }, [handlePrint]);

//   return (
//     <div className="flex flex-col justify-center items-center h-screen gap-y-3 bg-stone-400">
//       <h1 className="text-5xl p-10 ">Main Content</h1>
//       <GeneratePDF ref={reff} />
//       <button
//         onClick={handlePrint}
//         className="border border-black p-2 hover:text-white hover:bg-yellow-950 transition-all"
//       >
//         Generate
//       </button>
//     </div>
//   );
// };

// const GeneratePDF = React.forwardRef((props, ref) => {
//   return (
//     <div ref={ref} className="bg-red-50 p-4 flex justify-center items-center h-screen">
//       <h1 className="text-4xl">This is to be Generated</h1>
//     </div>
//   );
// });

// export default Error;
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-9xl font-light ">404</h1>
      <h1>Page Not Found</h1>
      <Link
        className="border border-black mt-8 p-2 hover:bg-amber-800 hover:text-white transition-all "
        to="/shop"
      >
        Go Back Shopping 🛒
      </Link>
    </div>
  );
};

export default Error;
