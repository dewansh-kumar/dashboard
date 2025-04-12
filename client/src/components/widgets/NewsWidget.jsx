// const puppeteer = require('puppeteer');

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Newspaper } from "lucide-react";
import { getNewsDetails } from "../../service/restApi";

export const NewsWidget = () => {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    try {
      const eventSource = await getNewsDetails();
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data).data;
        setNews(data);
      };
      return () => {
        eventSource.close();
      };
    } catch (error) {
      console.log("Unable to access news ", error);
    }
  };

  const getUpdatedTime = (timestamp) => {
    // Remove the timezone abbreviation
    const cleanedTimestamp = timestamp.replace(" IST", "");

    // Parse the cleaned timestamp
    const date = new Date(cleanedTimestamp);

    // Get the current time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = date - now;

    // Determine if the timestamp is in the future or past
    const isFuture = diffInMs > 0;

    // Convert the difference into absolute minutes
    const diffInMinutes = Math.floor(Math.abs(diffInMs) / (1000 * 60));

    // Format the result
    let relativeTime;
    if (diffInMinutes < 60) {
      relativeTime = `${isFuture ? "In" : "Updated"} ${diffInMinutes} minute${
        diffInMinutes !== 1 ? "s" : ""
      } ${isFuture ? "" : "ago"}`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      relativeTime = `${isFuture ? "In" : "Updated"} ${diffInHours} hour${
        diffInHours !== 1 ? "s" : ""
      } ${isFuture ? "" : "ago"}`;
    }

    return relativeTime;
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg mx-auto bg-background  font-semibold text-lg">
      <div className=" h-full space-y-2">
        <div className=" space-y-2">
          <div className=" flex justify-between items-center">
            <h2 className="">News</h2>
            <div className=" flex items-center space-x-3 text-lightTextColor">
              <Newspaper />
            </div>
          </div>
          <div>
            <hr className=" border-lightTextColor" />
          </div>
        </div>

        <div className="overflow-auto  scrollbar-none  border border-lightTextColor rounded-md mt-2 h-[480px] w-full">
          {news.map((item, index) => (
            <div className=" hover:bg-gray-900" key={index}>
              <div className=" flex justify-between items-center px-3 py-2 rounded-md  space-x-3 h-[80px] w-full">
                <div className=" w-[85%]">
                  <a href={`https://www.hindustantimes.com/${item.url}`}>
                    <div className=" space-y-2">
                      <h3 className="text-lightTextColor truncate xs:text-sm md:text-lg">
                        {item.heading}
                      </h3>
                      <div className=" xs:text-xs flex space-x-2">
                        <h4 className=" text-primary ">India News</h4>
                        <h4 className=" text-lightTextColor truncate">
                          {getUpdatedTime(item.updatedTime)}
                        </h4>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-[15%] h-full text-right align-middle flex justify-end ">
                  <img
                    src={item.imgUrl}
                    alt="img"
                    className=" object-fill rounded-md"
                  />
                </div>
              </div>
              <div className="">
                <hr className=" border-lightTextColor" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
