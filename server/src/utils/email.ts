import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to another service like Outlook, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an App Password if using Gmail
  },
});

/**
 * Sends a 6-digit OTP to the user's email address.
 * @param email - Recipient's email address
 * @param otp - The 6-digit OTP to send
 */
export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"Travel Journal Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4a90e2; text-align: center;">Travel Journal</h2>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
          You requested a password reset for your Travel Journal account. Use the following 6-digit OTP to verify your account.
        </p>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4a90e2; border-radius: 8px; margin: 25px 0; border: 1px dashed #4a90e2;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">
          This code is valid for <strong>5 minutes</strong>. If you did not request this, please ignore this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          &copy; ${new Date().getFullYear()} Travel Journal. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP successfully sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Could not send OTP email. Please try again later.");
  }
};
