// import { asyncHandler } from "../utils/asyncHandler.js";
// import { getCachedStocksData } from "../api/stock.js";

// export const getStocksInfo = asyncHandler(async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   setInterval(() => {
//     const stocksData = getCachedStocksData();

//     // If no data is available, you can choose to send an error or a default message
//     if (!stocksData.length) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//         message:
//           "Stocks data is being updated. Please try again in a few moments.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: stocksData,
//       message: "Stocks info fetched successfully",
//     });
//   }, 2000);
// });

// import { asyncHandler } from "../utils/asyncHandler.js";
// import { fetchAllStockData, getCachedStocksData } from "../api/stock.js";

// export const getStocksInfo = asyncHandler(async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   // Ensure connection stays open (useful for proxies)
//   res.flush?.();

//   // Function to send stock updates
//   const sendStockUpdates = async () => {
//     const stocksData = await fetchAllStockData();
//     console.log(stocksData)

//     if (!stocksData || stocksData.length === 0) {
//       res.write(
//         `data: ${JSON.stringify({
//           success: false,
//           message: "No stock data available.",
//         })}\n\n`
//       );
//     } else {
//       res.write(
//         `data: ${JSON.stringify({ success: true, data: stocksData })}\n\n`
//       );
//     }

//     res.flush?.(); // Flush the response to ensure immediate sending
//   };

//   // Send initial stock data immediately
//   sendStockUpdates();

//   // Set interval for stock updates (every 2s)
//   const intervalId = setInterval(sendStockUpdates, 2000);

//   // Send a heartbeat every 30s to keep connection alive
//   const heartbeatId = setInterval(() => {
//     res.write(`: heartbeat\n\n`);
//     res.flush?.();
//   }, 30000);

//   // Handle client disconnect
//   req.on("close", () => {
//     clearInterval(intervalId);
//     clearInterval(heartbeatId);
//     res.end();
//   });
// });

import { asyncHandler } from "../utils/asyncHandler.js";
import { fetchAllStockData } from "../api/stock.js";

// Cache control for SSE responses
const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  // Important for proxies and load balancers
  "X-Accel-Buffering": "no",
};

// Configuration constants
const UPDATE_INTERVAL_MS = 60000; // 1 min (reduced from 2s for better performance)
const HEARTBEAT_INTERVAL_MS = 25000; // 25 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export const getStocksInfo = asyncHandler(async (req, res) => {
  // Set SSE headers
  Object.entries(SSE_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Immediately flush headers to establish connection
  res.flushHeaders();

  let isConnectionAlive = true;
  let retryCount = 0;

  // Cleanup function
  const cleanup = (intervalId, heartbeatId) => {
    clearInterval(intervalId);
    clearInterval(heartbeatId);
    isConnectionAlive = false;
  };

  // Enhanced stock data fetcher with retries
  const fetchStockDataWithRetry = async () => {
    try {
      const stocksData = await fetchAllStockData();
      // console.log(stocksData);
      if (!stocksData?.length) {
        throw new Error("No stock data available");
      }

      return { success: true, data: stocksData };
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchStockDataWithRetry();
      }
      return {
        success: false,
        message: error.message || "Failed to fetch stock data",
      };
    }
  };

  // Send data to client
  const sendEvent = (event, data) => {
    if (!isConnectionAlive) return;

    try {
      res.write(`event: ${event}\n`);
      // res.write(`data: ${JSON.stringify(data)}\n\n`);
      res.write(`data: ${JSON.stringify({ success: true, data })}\n\n`);
      res.flush?.();
    } catch (error) {
      console.error("SSE write error:", error);
      isConnectionAlive = false;
    }
  };

  // Initial data fetch
  try {
    const initialData = await fetchStockDataWithRetry();
    
    sendEvent("update", initialData.data);
  } catch (error) {
    sendEvent("error", { message: "Initial fetch failed" });
  }

  // Periodic updates
  const updateInterval = setInterval(async () => {
    if (!isConnectionAlive) {
      clearInterval(updateInterval);
      return;
    }

    try {
      const updateData = await fetchStockDataWithRetry();
      sendEvent("update", updateData.data);
      retryCount = 0; // Reset retry counter after successful update
    } catch (error) {
      sendEvent("error", { message: "Update failed" });
    }
  }, UPDATE_INTERVAL_MS);

  // Heartbeat to keep connection alive
  const heartbeatInterval = setInterval(() => {
    if (isConnectionAlive) {
      res.write(": heartbeat\n\n");
      res.flush?.();
    } else {
      clearInterval(heartbeatInterval);
    }
  }, HEARTBEAT_INTERVAL_MS);

  // Connection cleanup
  req.on("close", () => {
    cleanup(updateInterval, heartbeatInterval);
    res.end();
  });

  req.on("error", () => {
    cleanup(updateInterval, heartbeatInterval);
    res.end();
  });
});
