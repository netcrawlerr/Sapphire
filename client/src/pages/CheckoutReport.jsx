import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

const CheckoutReport = () => {
  const location = useLocation();
  const { total, checkoutItems } = location.state || {};
  const [isGenerated, setIsGenerated] = useState(false);

  const generateReport = () => {
    const input = document.getElementById("report-content");
    const backLink = document.getElementById("backHome");
    const button = document.getElementById("download");

    // im toggling elements
    backLink.style.display = "none";
    button.style.display = "none";

    // i might need to tweak this abit
    const scale = 1.5;
    const pdfScale = 1.2;

    html2canvas(input, { scale, backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width * pdfScale;
      const imgHeight = canvas.height * pdfScale;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [imgWidth, imgHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("purchase_report.pdf");
      // toggleback......
      backLink.style.display = "flex";
      button.style.display = "block";
      setIsGenerated(true);
    });
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-10 gap-x-5 bg-gray-100">
      <Link
        to="/shop"
        id="backHome"
        className="flex items-center justify-center h-12 w-24 bg-white rounded-md text-gray-800 tracking-wide transition-all duration-200 cursor-pointer border-none hover:shadow-[9px_9px_33px_rgba(209,209,209,1),_-9px_-9px_33px_rgba(255,255,255,1)] hover:transform hover:-translate-y-0.5"
      >
        <svg
          className="mr-2 ml-2 text-xl transition-all duration-400 hover:text-xl hover:translate-x-[-5px]"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
        </svg>
        <span>Back</span>
      </Link>

      <div
        id="report-content"
        className="p-4 max-w-md bg-white rounded-xl shadow-md"
      >
        <h1 className="text-xl font-bold text-gray-800 mb-4">Sapphire</h1>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Purchase Report
        </h2>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-base font-semibold text-gray-700 mb-2">
            Total: <span className="text-blue-600">{total} Birr</span>
          </p>
          <ul className="divide-y divide-gray-200">
            {checkoutItems &&
              checkoutItems.map((item, index) => (
                <li
                  key={index}
                  className="py-2 flex justify-between items-center"
                >
                  <div className="text-gray-700 flex justify-between gap-x-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} pcs
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {item.price} Birr each
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <h1 className="text-sm text-green-500 mt-2">Call 09-09-09-09-09</h1>
        <h1 className="text-sm text-green-500 mb-5">Call 09-09-09-09-09</h1>
        <h1 className="text-center text-sm">Thanks for Shopping with Us</h1>

        <div className="mt-4 text-center">
          {!isGenerated && (
            <button
              id="download"
              onClick={generateReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutReport;
