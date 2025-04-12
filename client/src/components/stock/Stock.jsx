// import React, { useEffect, useState } from "react";
// import { ChartCandlestick } from "lucide-react";
// import { StockItem } from "./StockItem.jsx";
// import { getStocksDetails } from "../../service/restApi.js";

// export const Stock = React.memo(() => {
//   const [stocksData, setStocksData] = useState([]);

//   const getStocks = async () => {
//     try {
//       const eventSource = await getStocksDetails();
//       console.log(eventSource)
//       eventSource.onmessage = (event) => {
        
//         const data = JSON.parse(event.data).data;
//         console.log(data)
//         setStocksData(data);
//       };
//       return () => {
//         eventSource.close();
//       };
//     } catch (error) {
//       console.log("Getting error while fetching the stock data");
//     }
//   };

//   useEffect(() => {
//     getStocks();
//   }, []);

//   return (
//     <div className="text-white p-6 rounded-lg shadow-lg w-full mx-auto bg-background h-[600px] flex flex-col">
//       {/* Header Section */}
//       <div className="space-y-2">
//         <div className="text-center flex justify-between">
//           <h2 className="font-semibold">Market</h2>

//           <div className="font-semibold text-lightTextColor">
//             <ChartCandlestick />
//           </div>
//         </div>

//         <div>
//           <hr className="border-lightTextColor" />
//         </div>
//       </div>

//       {/* Stock Items Container */}
//       <div className="flex-1 overflow-auto mt-2 border border-lightTextColor rounded-md scrollbar-none">
//         {stocksData.map((item, index) => (
//           <StockItem stockInfo={item} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// });


import React, { useEffect, useState, useCallback } from "react";
import { ChartCandlestick } from "lucide-react";
import { StockItem } from "./StockItem.jsx";
import { getStocksDetails } from "../../service/restApi.js";

export const Stock = React.memo(() => {
  const [stocksData, setStocksData] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Memoized function to handle incoming messages
  const handleMessage = useCallback((event) => {
    try {
      const parsedData = JSON.parse(event.data);
      if (parsedData.success && Array.isArray(parsedData.data)) {
        setStocksData(parsedData.data);
      } else {
        setError(parsedData.message || "Invalid data format");
      }
    } catch (err) {
      setError("Failed to parse stock data");
      console.error("Parsing error:", err);
    }
  }, []);

  // Memoized function to handle errors
  const handleError = useCallback(() => {
    setError("Connection lost. Attempting to reconnect...");
    setIsConnected(false);
    // Attempt reconnect after delay
    setTimeout(getStocks, 5000);
  }, []);

  const getStocks = useCallback(async () => {
    try {
      const eventSource = await getStocksDetails();
      setIsConnected(true);
      setError(null);

      // Setup event listeners
      eventSource.addEventListener('update', handleMessage);
      eventSource.addEventListener('error', (e) => {
        const errorData = JSON.parse(e.data);
        setError(errorData.message || "Stock data error");
      });
      eventSource.onerror = handleError;

      // Store eventSource in state for cleanup
      return eventSource;
    } catch (err) {
      setError("Failed to connect to stock feed");
      console.error("Connection error:", err);
      return null;
    }
  }, [handleMessage, handleError]);

  useEffect(() => {
    let eventSource;
    let reconnectTimer;

    const setupConnection = async () => {
      eventSource = await getStocks();
    };

    setupConnection();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      clearTimeout(reconnectTimer);
    };
  }, [getStocks]);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg w-full mx-auto bg-background h-[600px] flex flex-col">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="text-center flex justify-between">
          <h2 className="font-semibold">Market</h2>
          <div className="font-semibold text-lightTextColor">
            <ChartCandlestick />
            {!isConnected && (
              <span className="text-xs text-yellow-500 ml-1">Connecting...</span>
            )}
          </div>
        </div>

        <div>
          <hr className="border-lightTextColor" />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-400 text-sm p-2 bg-red-900/20 rounded mb-2">
          {error}
        </div>
      )}

      {/* Stock Items Container */}
      <div className="flex-1 overflow-auto mt-2 border border-lightTextColor rounded-md scrollbar-none">
        {stocksData.length > 0 ? (
          stocksData.map((item, index) => (
            <StockItem stockInfo={item} key={`${item.meta.symbol}-${index}`} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-lightTextColor">
            {error ? "Error loading data" : "Loading market data..."}
          </div>
        )}
      </div>
    </div>
  );
});