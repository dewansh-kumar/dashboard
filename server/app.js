import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

// Increase request size limit
app.use(bodyParser.json({ limit: "50mb" })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json({ limit: "50mb" }));

// agar data url  se le rahe h to wo encoded ho kar ata h
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send('Static files are served from the "public" directory.');
// });

// routers
import useRouter from "./src/route/user.route.js";
import todoRouter from "./src/route/todo.route.js";
import newRouter from "./src/route/news.route.js";
import stockRouter from "./src/route/stock.route.js";
import holidayRouter from "./src/route/holiday.route.js";
import googleAiRouter from "./src/route/googleAi.route.js";

app.use("/api/v1/user", useRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/news", newRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/holiday", holidayRouter);
app.use("/api/v1/ai", googleAiRouter);

export { app };
