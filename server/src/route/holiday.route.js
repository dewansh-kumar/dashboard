import { Router } from "express";
import { getHolidayDetails } from "../controller/holiday.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/getHoliday").get(verifyJWT, getHolidayDetails)

export default router