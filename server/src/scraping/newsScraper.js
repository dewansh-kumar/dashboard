import { load } from "cheerio";
import axios from "axios";


// Function to perform the scraping
export async function scrapeNews() {
  try {
    const { data } = await axios.get("https://www.hindustantimes.com/");
    const $ = load(data);

    const response = [];
    $("div.cartHolder.listView.track.timeAgo").each((i, ei) => {
      const heading = $(ei).find("h3 a").text().trim();
      const url = $(ei).find("h3 a").attr("href");
      const imgUrl = $(ei).find("figure a img").attr("data-src");
      let lastUpdatedTime = $(ei)
        .find("div.storyShortDetail div.dateTime")
        .text()
        .trim();

      // const updatedTime = getUpdatedTime(lastUpdatedTime.substring(0, 10));
      let count = 0;
      let j = 0;
      while (j < lastUpdatedTime.length && count < 2) {
        if (lastUpdatedTime.charAt(j) == " ") {
          count++;
        }
        j++;
      }
      // console.log("tiem in milli ", lastUpdatedTime.substring(j));
      const updatedTime = lastUpdatedTime.substring(j).trim();

      // Only push the object if heading and url exist
      if (heading && url) {
        response.push({ heading, url, imgUrl, updatedTime });
      }
    });

    return response;
    console.log("News data updated:", response.length, "items");
  } catch (error) {
    console.error("Error while scraping news:", error);
  }
}
