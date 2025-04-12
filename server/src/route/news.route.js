import { Router } from "express";
import { getNewsInfo } from "../controller/news.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/getNews").get(getNewsInfo);

export default router;
