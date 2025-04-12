import React, { useState } from "react";
import StockModal from "./StockModal.jsx";

export const StockItem = ({ stockInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnclickStock = () => {
    // console.log("Stock modal close ho gya");
    setIsOpen(!isOpen);
  };

  function getStockPercentageChange() {
    const meta = stockInfo.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose;

    if (!currentPrice || !previousClose) {
      console.log("Price data unavailable");
      return;
    }

    return (((currentPrice - previousClose) / previousClose) * 100).toFixed(2);
  }

  const stockChangeColor = () => {
    const change = getStockPercentageChange();

    if (parseFloat(change) < 0) {
      return "text-red-600";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div>
      <div className="" onClick={handleOnclickStock}>
        <div className=" flex justify-between cursor-pointer px-2 py-2 w-full hover:bg-gray-900 rounded-md">
          <div className="w-[85%] text-lightTextColor">
            {" "}
            <h1 className="  my-auto text-gray-300">
              {stockInfo.meta.shortName.split(" ")[0]}
            </h1>
            <h1 className="truncate text-sm">{stockInfo.meta.longName}</h1>
          </div>

          <div className=" text-right text-sm">
            <h2 className={` ${stockChangeColor()}`}>
              {getStockPercentageChange()}%
            </h2>
            <h2 className=" text-lightTextColor">
              {stockInfo.meta.regularMarketPrice}
            </h2>
          </div>
        </div>
        <div className="">
          <hr className=" border-lightTextColor" />
        </div>
      </div>
      <div>
        {isOpen && (
          <StockModal
            isOpen={isOpen}
            onClose={handleOnclickStock}
            stockData={stockInfo}
          />
        )}
      </div>
    </div>
  );
};
