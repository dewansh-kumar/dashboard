import axios from "axios";

const tickerSymbols = [
  "RELIANCE.NS", // Reliance Industries
  "TCS.NS", // Tata Consultancy Services (TCS)
  "HDFCBANK.NS", // HDFC Bank
  "INFY.NS", // Infosys
  "ICICIBANK.NS", // ICICI Bank
  "KOTAKBANK.NS", // Kotak Mahindra Bank
  "HINDUNILVR.NS", // Hindustan Unilever
  "LT.NS", // Larsen & Toubro (L&T)
  "BHARTIARTL.NS", // Bharti Airtel
  "ITC.NS", // ITC Limited
  "SBIN.NS", // State Bank of India (SBI)
  "AXISBANK.NS", // Axis Bank
  "MARUTI.NS", // Maruti Suzuki
  "BAJFINANCE.NS", // Bajaj Finance
  "ASIANPAINT.NS", // Asian Paints
  "NESTLEIND.NS", // Nestlé India
  "HCLTECH.NS", // HCL Technologies
  "ULTRACEMCO.NS", // UltraTech Cement
  "POWERGRID.NS", // Power Grid Corporation of India
  "M&M.NS", // Mahindra & Mahindra
];

let cachedStockData = [];

async function fetchStockData(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.chart.error) {
      console.error("API error:", data.chart.error);
      return null;
    }

    const result = data.chart.result[0];

    return result;
  } catch (error) {
    console.error("Error fetching data for", symbol, error);
    return null;
  }
}

// export const fetchAllStockData = async () => {
//   try {
//     // Wait for all fetchStockData calls to complete using Promise.all
//     const stocksData = await Promise.all(
//       tickerSymbols.map((symbol) => fetchStockData(symbol))
//     );

//     // console.log("Stocks data updated: " + stocksData.length);
//     return stocksData;
//   } catch (error) {
//     console.log("Error while fetching the stock details", error);
//   }
// };

export const fetchAllStockData = async () => {
  try {
    // Use Promise.allSettled instead of Promise.all to handle failures gracefully
    const results = await Promise.allSettled(
      tickerSymbols.map((symbol) => fetchStockData(symbol))
    );

    // Process results - filter out failed requests and get successful ones
    const successfulResults = results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

    // Optional: Log failed requests
    const failedRequests = results
      .filter(result => result.status === 'rejected' || result.value === null)
      .map((result, index) => ({
        symbol: tickerSymbols[index],
        error: result.reason || 'Returned null data'
      }));

    if (failedRequests.length > 0) {
      console.warn('Failed to fetch data for:', failedRequests);
    }

    // console.log(`Successfully fetched ${successfulResults.length}/${tickerSymbols.length} stocks`);
    return successfulResults;
  } catch (error) {
    console.error("Unexpected error in fetchAllStockData:", error);
    return []; // Return empty array instead of breaking
  }
};

// Function to get the cached stock data
export const getCachedStocksData = () => {
  return cachedStockData;
};
