import { RefreshToken } from "../modal/refreshToken.modal.js";
import { User } from "../modal/user.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getExpiryTime } from "../utils/getExpiryTime.js";
import { generateAccessAndRefreshToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/passwordEncryptor.js";
import {
  signinSchemaValidator,
  signupSchemaValidator,
} from "../validator/usersDetails.validator.js";
import jwt from "jsonwebtoken";

// register the user
export const signup = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Validate user details
  try {
    signupSchemaValidator.parse({ email, firstName, lastName, password });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.errors[0].message, // Send the first validation error message
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).send({
      success: false,
      message: "User already exists",
    });
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the user
  const user = await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword, // Correctly assign the hashed password
  });

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not created successfully",
    });
  }

  // Fetch the created user without the password field
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong while registering the user",
    });
  }

  // Return success response
  return res.status(201).send({
    success: true,
    message: "User registered successfully",
    data: createdUser,
  });
});

// login the user
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    signinSchemaValidator.parse({ email, password });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.errors[0].message, // Send the first validation error message
    });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).send({
      success: false,
      message: "User Not Found",
    });
  }

  const isPasswordMatched = await comparePassword(
    password,
    existingUser.password
  );

  if (!isPasswordMatched) {
    return res.status(401).send({
      success: false,
      message: "Password Doesn't Matched",
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  );

  const expiryTime = getExpiryTime(process.env.REFRESH_TOKEN_EXPIRY);

  const refreshTokenObj = await RefreshToken.create({
    userId: existingUser._id,
    token: refreshToken,
    expiresAt: expiryTime,
  });

  if (!refreshTokenObj) {
    return res.status(500).send({
      success: false,
      message: "Refresh Token Doesn't Stored in Database",
    });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: false, // For development, set to true in production
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .send({
      success: true,
      message: "User LoggedIn Successfully",
      date: {
        email: existingUser.email,
      },
    });
});

// get user details
export const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).send({
    success: true,
    data: user,
  });
});

// Generate Access Token using Refresh Token
export const generateAccessTokenUsingRefreshToken = asyncHandler(
  async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || null;

    if (!incomingRefreshToken) {
      return res.status(403).send({
        success: false,
        message: "Refresh Token Has Been Expired",
      });
    }
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    const restoredRefreshToken = await RefreshToken.findOne({
      userId: decodedToken.userId,
      token: incomingRefreshToken,
    });

    if (!restoredRefreshToken) {
      return res.status(403).send({
        success: false,
        message: "Refresh Token Has Been Expired",
      });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      restoredRefreshToken.userId
    );

    // console.log("refresh ", refreshToken, "access", accessToken)
    const expiryTime = getExpiryTime(process.env.REFRESH_TOKEN_EXPIRY);

    const updatedRefreshToken = await RefreshToken.findOneAndUpdate(
      {
        userId: restoredRefreshToken.userId,
        token: restoredRefreshToken.token,
      },
      { token: refreshToken, expiresAt: expiryTime },
      { new: true }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .send({
        success: true,
        message: "Access token generated successfully",
        data: updatedRefreshToken,
      });
  }
);
