# Implementation Plan: Forgot Password & 2FA Flow

This document outlines the step-by-step implementation of the "Forgot Password" feature with Email-based OTP verification, as described in `login-feature-forgetPassword.md`.

---

## Phase 1: Backend Implementation (Server)

### 1. Install Necessary Dependencies

We need `nodemailer` for sending emails and its types for TypeScript.

```bash
cd server
npm install nodemailer
npm install -D @types/nodemailer
```

### 2. Update User Model

Modify `server/src/models/User.ts` to include fields for OTP and Reset Tokens.

- `otp`: The 6-digit code.
- `otpExpires`: Expiration time for the OTP (5 minutes).
- `resetToken`: Temporary token issued after successful OTP verification.
- `resetTokenExpires`: Expiration time for the reset token (10 minutes).

### 3. Setup Email Service Utility

Create a utility in `server/src/utils/email.ts` using `nodemailer` to handle sending OTP emails. You will need to add `EMAIL_USER` and `EMAIL_PASS` (or service-specific keys) to your `.env` file.

### 4. Implement Auth Controllers

Add the following functions to `server/src/controllers/authController.ts`:

- **`requestOTP`**:
  - Validates email.
  - Generates 6-digit OTP.
  - Saves OTP & expiry to the database.
  - Sends the email.
- **`verifyOTP`**:
  - Validates the 6-digit OTP.
  - Checks if expired.
  - If valid, generates a `resetToken` (using `crypto.randomBytes(32)`).
  - Saves `resetToken` & expiry to the database and clears the OTP.
  - Returns the `resetToken` to the frontend.
- **`resetPassword`**:
  - Validates the `resetToken`.
  - Checks if expired.
  - Hashes the new password.
  - Updates the user's password and clears the `resetToken`.

### 5. Define Routes

Update `server/src/routes/authRoutes.ts` to include:

- `POST /auth/forgot-password`: Calls `requestOTP`.
- `POST /auth/verify-otp`: Calls `verifyOTP`.
- `POST /auth/reset-password`: Calls `resetPassword`.

---

## Phase 2: Frontend Implementation (Client)

### 1. Create UI Components

Build the three distinct interfaces in `client/src/pages/auth/`:

- **`ForgotPasswordEmail.tsx`**:
  - Form with email input.
  - "Send" button that triggers the OTP request.
- **`ForgotPasswordOTP.tsx`**:
  - Form with 6-digit input.
  - "Verify" button.
  - "Resend OTP" link with a 60s countdown timer.
- **`ForgotPasswordReset.tsx`**:
  - Form with "New Password" and "Confirm Password" inputs.
  - "Confirm" button.

### 2. Configure Routing

Update `client/src/App.tsx` (or your routes file) to add the new routes:

- `/forgot-password`: Renders `ForgotPasswordEmail`.
- `/verify-otp`: Renders `ForgotPasswordOTP`.
- `/reset-password`: Renders `ForgotPasswordReset`.

### 3. API Integration

Create an API service layer or update your existing one (e.g., in `client/src/lib/api.ts`) to handle the new backend calls.

- `forgotPassword(email)`
- `verifyOTP(email, otp)`
- `resetPassword(email, resetToken, newPassword)`

### 4. Navigation & State Management

- Use `useNavigate` from `react-router-dom` to transition between steps.
- Use `localStorage` to keep track of the email during the process.

---

## Phase 3: Security & Polish

### 1. Rate Limiting

Ensure that the "Resend OTP" button on the frontend is disabled for 60 seconds after use. On the backend, implement logic to prevent generating a new OTP if one was sent very recently.

### 2. Loading States & Validation

- Add loading spinners to buttons during API calls.
- Implement client-side validation (e.g., email format, password matching).

### 3. Success/Error Feedback

Use a toast notification system (like `react-hot-toast` or `sonner`) to show success and error messages to the user.
