import React from "react";
import { Navbar } from "../components/Navbar";
import CalendarWidget from "../components/widgets/CalendarWidget.jsx";
import WeatherWidget from "../components/widgets/CloudWidget.jsx";
import { NewsWidget } from "../components/widgets/NewsWidget.jsx";
import { WatchWidget } from "../components/widgets/WatchWidget.jsx";
import { Todo } from "../components/todo/Todo.jsx";
import { Stock } from "../components/stock/Stock.jsx";
import { AiCharBot } from "../components/aiCharbot/AiCharBot.jsx";

export const Home = () => {
  return (
    <div>
      {" "}
      <div>
        <Navbar />
      </div>
      <div className=" grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3  bg-lightBackground p-6 gap-3">
        <CalendarWidget />
        <WeatherWidget />
        <WatchWidget />
        <div className="xs:col-span-[1] md:col-span-2">
          <NewsWidget />
        </div>

        <Todo />
        <Stock />
        <div className="xs:col-span-[1] md:col-span-2">
          <AiCharBot/>
        </div>
      </div>
    </div>
  );
};
