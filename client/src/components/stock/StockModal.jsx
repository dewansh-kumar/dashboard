import { Line } from "react-chartjs-2";
import { Dialog } from "@headlessui/react"; // For modal
import { X } from "lucide-react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// export default function StockModal({ stockData, isOpen, onClose }) {
//   const labels = stockData.timestamp.map(
//     (ts) => new Date(ts * 1000).toISOString().split("T")[0]
//   );
//   const prices = stockData.indicators.quote[0].close;

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: `${stockData.meta.symbol} Stock Price`,
//         data: prices,
//         borderColor: "yellow",
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={onClose}
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-sm"
//     >
//       <div className="bg-white p-6 rounded-lg shadow-lg xs:w-[320px] md:w-[600px]">
//         <div className=" flex justify-between items-center  text-background ">
//           <h2 className="xs:text-lg md:text-xl font-bold">
//             {stockData.meta.longName}
//           </h2>
//           <X className=" cursor-pointer hover:text-red-600" onClick={onClose} />
//         </div>
//         <div className="my-3">
//           <hr className="border-lightBackground" />
//         </div>
//         {stockData ? (
//           <>
//             {/* <h2 className="text-2xl font-bold text-center mb-4">
//               {stockData.meta.longName} ({stockData.meta.symbol})
//             </h2> */}

//             {/* Stock Details */}
//             <div className="text-gray-700 space-y-2">
//               <p>
//                 <strong>Exchange:</strong> {stockData.meta.exchangeName}
//               </p>
//               <p>
//                 <strong>Market Price:</strong> ₹
//                 {stockData.meta.regularMarketPrice}
//               </p>
//               <p>
//                 <strong>52-Week High:</strong> ₹
//                 {stockData.meta.fiftyTwoWeekHigh}
//               </p>
//               <p>
//                 <strong>52-Week Low:</strong> ₹{stockData.meta.fiftyTwoWeekLow}
//               </p>
//               <p>
//                 <strong>Previous Close:</strong> ₹
//                 {stockData.meta.chartPreviousClose}
//               </p>
//             </div>

//             {/* Stock Chart */}
//             {chartData && (
//               <div className="mt-4">
//                 <Line data={chartData} />
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-center">Loading stock data...</p>
//         )}
//       </div>
//     </Dialog>
//   );
// }


export default function StockModal({ stockData, isOpen, onClose }) {
  const labels = stockData.timestamp.map(
    (ts) => new Date(ts * 1000).toISOString().split("T")[0]
  );
  const prices = stockData.indicators.quote[0].close;

  const chartData = {
    labels,
    datasets: [
      {
        label: `${stockData.meta.symbol} Stock Price`,
        data: prices,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: false, // Disable built-in responsiveness
    maintainAspectRatio: false, // Don't maintain aspect ratio
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center text-background">
          <h2 className="text-lg md:text-xl font-bold">
            {stockData.meta.longName}
          </h2>
          <X className="cursor-pointer hover:text-red-600" onClick={onClose} />
        </div>
        <div className="my-3">
          <hr className="border-lightBackground" />
        </div>
        
        {stockData ? (
          <div className="space-y-4">
            {/* Stock Details */}
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Exchange:</strong> {stockData.meta.exchangeName}
              </p>
              <p>
                <strong>Market Price:</strong> ₹
                {stockData.meta.regularMarketPrice}
              </p>
              <p>
                <strong>52-Week High:</strong> ₹
                {stockData.meta.fiftyTwoWeekHigh}
              </p>
              <p>
                <strong>52-Week Low:</strong> ₹{stockData.meta.fiftyTwoWeekLow}
              </p>
              <p>
                <strong>Previous Close:</strong> ₹
                {stockData.meta.chartPreviousClose}
              </p>
            </div>

            {/* Stock Chart with fixed dimensions */}
            <div className="mt-4 w-full h-[300px] overflow-scroll scrollbar-none">
              <Line 
                data={chartData} 
                options={chartOptions}
                width={800}
                height={300}
              />
            </div>
          </div>
        ) : (
          <p className="text-center">Loading stock data...</p>
        )}
      </div>
    </Dialog>
  );
}