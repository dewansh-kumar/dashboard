import { Router } from "express";
import {
  signup,
  signin,
  getUser,
  generateAccessTokenUsingRefreshToken,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/getUser").get(verifyJWT, getUser);
router.route("/regenerateAccessToken").get(generateAccessTokenUsingRefreshToken);

export default router;
