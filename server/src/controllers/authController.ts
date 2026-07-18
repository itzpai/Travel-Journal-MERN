import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import HttpStatusCodes from "../helpers/status_code_helper";
import crypto from "crypto";
import { sendOTPEmail } from "../utils/email";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    //check inputs
    if (!username || !email || !password) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("All fields are required"));
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    //check if user already exists
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "User already exists with this email"
          : "Username is already taken";
      return res.status(409).json(HttpStatusCodes.ALREADY_EXISTS(message));
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //success response
    res.status(200).json(
      HttpStatusCodes.OK(
        {
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
        },
        "User registered successfully",
      ),
    );
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error during registration"));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check inputs
    if (!email || !password) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("All fields are required"));
    }

    const user = await User.findOne({ email });

    //check if user exists
    if (!user) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    //check if password is correct
    if (!isMatch) {
      return res
        .status(401)
        .json(HttpStatusCodes.UNAUTHENTICATED("Invalid email or password"));
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    //set new cookie only in production mode
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //success
    res.status(200).json(
      HttpStatusCodes.OK(
        {
          token: accessToken,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        },
        "Login successful",
      ),
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(HttpStatusCodes.UNKNOWN("Server error during login"));
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  //check if refresh token is provided
  if (!refreshToken) {
    return res
      .status(401)
      .json(HttpStatusCodes.UNAUTHENTICATED("No refresh token provided"));
  }

  try {
    //verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.userId);

    //check if user exists and refresh token is valid
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json(HttpStatusCodes.PERMISSION_DENIED("Invalid refresh token"));
    }

    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    //set new refreshToken
    user.refreshToken = newRefreshToken;
    await user.save();

    //set new cookie only in production mode
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //success
    res.status(200).json(
      HttpStatusCodes.OK({
        token: newAccessToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      }),
    );
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      res.clearCookie("refreshToken");
      return res
        .status(401)
        .json(HttpStatusCodes.UNAUTHENTICATED("Refresh token expired"));
    }
    return res
      .status(403)
      .json(HttpStatusCodes.PERMISSION_DENIED("Invalid refresh token"));
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  //check if refresh token is provided
  if (!refreshToken) {
    return res
      .status(400)
      .json(HttpStatusCodes.INVALID_ARGUMENT("No refresh token provided"));
  }

  try {
    //verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as JwtPayload;

    //remove refresh token
    await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });

    //clear cookie only in production mode
    res.clearCookie("refreshToken");

    //success
    res
      .status(200)
      .json(HttpStatusCodes.OK(undefined, "Logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    res.clearCookie("refreshToken");
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while logging out"));
  }
};

export const requestOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("Email is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(HttpStatusCodes.NOT_FOUND("User with this email not found"));
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTPEmail(email, otp);

    res
      .status(200)
      .json(HttpStatusCodes.OK(undefined, "OTP sent to your email"));
  } catch (error) {
    console.error("Request OTP error:", error);
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while requesting OTP"));
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("Email and OTP are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(HttpStatusCodes.NOT_FOUND("User not found"));
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("Invalid or expired OTP"));
    }

    // Generate short-lived reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json(
      HttpStatusCodes.OK(
        {
          resetToken,
        },
        "OTP verified successfully",
      ),
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while verifying OTP"));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, resetToken, newPassword } = req.body;
  try {
    if (!email || !resetToken || !newPassword) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(HttpStatusCodes.NOT_FOUND("User not found"));
    }

    if (
      user.resetToken !== resetToken ||
      !user.resetTokenExpires ||
      user.resetTokenExpires < new Date()
    ) {
      return res
        .status(400)
        .json(HttpStatusCodes.INVALID_ARGUMENT("Invalid or expired reset token"));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res
      .status(200)
      .json(HttpStatusCodes.OK(undefined, "Password reset successfully"));
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while resetting password"));
  }
};
