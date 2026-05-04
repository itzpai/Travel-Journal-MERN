import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OTPFormData } from "../../validations/schemas";
import api from "../../lib/axios";
import { useState, useEffect } from "react";

export default function ForgotPasswordOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("recoveryEmail");
  const resetTokenFromState = location.state?.resetToken; // In case we navigate here with a token

  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormData) => {
    try {
      setError(null);
      const response = await api.post("/auth/verify-otp", {
        email,
        otp: data.otp,
      });
      const { resetToken } = response.data.data;
      navigate("/reset-password", { state: { resetToken } });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid or expired OTP.",
      );
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      setError(null);
      await api.post("/auth/forgot-password", { email });
      setResendCooldown(60);
      setCanResend(false);
      // You might want to use a toast here
      alert("A new OTP has been sent to your email.");
    } catch (err: any) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-gray-900">{email}</span>.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              maxLength={6}
              className={`w-full rounded-md border px-3 py-2 text-sm text-center tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                errors.otp ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="000000"
              {...register("otp")}
            />
            {errors.otp && (
              <p className="mt-1 text-xs text-red-600 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-gray-900 font-medium hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-400">Resend in {resendCooldown}s</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
