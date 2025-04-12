import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getGoogleAiResponse } from "../controller/googlAi.controller.js";

const router = Router();

router.route("/getAiResponse").post( getGoogleAiResponse);

export default router;
