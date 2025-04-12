import { getAiResponse } from "../api/googlAi.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getGoogleAiResponse = asyncHandler(async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(500).json({
      success: false,
      message: "Input required",
    });
  }

  let response;
  try {
    response = await getAiResponse(input);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Getting error while fetching Gemini api",
    });
  }

  return res.status(200).json({
    success: true,
    data: response,
    message: "Input response fetched successfully",
  });
});
