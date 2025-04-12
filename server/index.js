// import { config } from "dotenv";
import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnect } from "./src/db/index.js";
dotenv.config();

const port = process.env.PORT || 8000;
// console.log(process.env.ACCESS_TOKEN_SECRET);

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`application is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed", error);
    process.exit(1);
  });
