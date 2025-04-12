// // newsController.js
// import { asyncHandler } from "../utils/asyncHandler.js";
// import {  scrapeNews } from "../scraping/newsScraper.js";

// export const getNewsInfo = asyncHandler(async (req, res) => {
//   const newsData =  await scrapeNews();

//   // If no data is available, you can choose to send an error or a default message
//   if (!newsData.length) {
//     return res.status(200).json({
//       success: true,
//       data: [],
//       message: "News data is being updated. Please try again in a few moments.",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: newsData,
//     message: "News info fetched successfully",
//   });
// });

import { asyncHandler } from "../utils/asyncHandler.js";
import { scrapeNews } from "../scraping/newsScraper.js";

export const getNewsInfo = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Ensure the connection stays open (useful in proxies)
  res.flush?.();

  // Function to fetch and send news updates
  const sendNewsUpdates = async () => {
    const newsData = await scrapeNews();

    if (!newsData || newsData.length === 0) {
      res.write(
        `data: ${JSON.stringify({
          success: false,
          message: "No news data available.",
        })}\n\n`
      );
    } else {
      res.write(
        `data: ${JSON.stringify({ success: true, data: newsData })}\n\n`
      );
    }

    res.flush?.(); // Ensure data is sent immediately
  };

  // Send initial news data immediately
  await sendNewsUpdates();

  // Set interval to send news updates every 10 seconds
  const intervalId = setInterval(sendNewsUpdates, 1800000);

  // Send a heartbeat every 30 seconds to keep the connection alive
  const heartbeatId = setInterval(() => {
    res.write(`: keep-alive\n\n`);
    res.flush?.();
  }, 30000);

  // Close connection when the client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
    clearInterval(heartbeatId);
    res.end();
  });
});
