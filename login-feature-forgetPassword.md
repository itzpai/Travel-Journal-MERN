# Forgot Password & 2FA Feature - Logic and Data Flow

---

## Overview

The new authentication feature introduces a secure "Forgot Password" flow equipped with Email-based OTP. This ensures users can securely recover their accounts while preventing unauthorized access or direct password resets.

---

## User Interface & Route Breakdown

### 1. Request Password Reset (Email Input Route)

- The entry point for the password recovery process.
- Accessible via a "Forgot Password" link placed below the email and password inputs on the Login Page.
- The UI contains a single input for the email address and a "Send" button.

**Validation & Action:**
- If the "Send" button is clicked without entering an email, a warning message is displayed.
- Upon submitting a valid email, the system initiates the OTP dispatch and transitions to the OTP Verification route.

**Flow:**
1. User clicks the "Forgot Password" link on the Login page.
2. User is redirected to the Email Input Route.
3. User enters their registered email address and clicks "Send".
4. UI displays a loading state (e.g., "Sending OTP...").
5. Backend verifies the email and sends a 6-digit OTP to the user's inbox.
6. User is redirected to the OTP Verification Route.

---

### 2. OTP Verification 

- A dedicated interface where the user must input the 6-digit OTP received via email.
- Includes a "Resend OTP" button with a countdown timer to prevent email spamming.

**Validation & Action:**
- The OTP must be exactly 6 digits.
- The OTP has a strict expiration time (e.g., 5 minutes).
- If the OTP is correct, the backend issues a secure, temporary `reset_token` to allow access to the next step.

**Flow:**
1. User is prompted with an input to enter the 6-digit OTP.
2. User enters the OTP and clicks "Verify".
3. Backend validates the OTP against the stored record.
4. If valid, the backend generates a short-lived `reset_token` and sends it to the frontend.
5. User is redirected to the Password Reset Route.
6. If the email was not received, the user can click "Resend OTP" after a 60-second cooldown period.

---

### 3. Password Reset Route

- The final step where the user defines their new password.
- Requires entering the new password twice to prevent typos.

**Validation & Action:**
- "New Password" and "Confirm Password" fields must match exactly.
- Upon clicking "Confirm", the frontend sends the new password along with the temporary `reset_token` to the backend.
- The backend verifies the token before allowing the database update.

**Flow:**
1. User enters New Password and Confirm Password.
2. UI validates that both inputs match.
3. User clicks "Confirm".
4. Backend verifies the `reset_token` and updates the user's password in the database.
5. `reset_token` is immediately invalidated after a successful change.
6. User is redirected back to the Login page with a success message.
7. User can now log in using the newly created password.

---

## Data Flow, Security and Caching

### Cache & Storage (Redis / DB)

- **OTP Generation & TTL (Time-To-Live):**
  - When an OTP is generated, it is stored in Redis (or the database) with the user's email as the identifier.
  - A strict **5-minute TTL** is applied. Once expired, the OTP is automatically destroyed from the cache.
- **Reset Token Security:**
  - Upon successful OTP verification, a unique cryptographic `reset_token` is generated.
  - This token is cached with a **10-minute TTL** and is strictly tied to the user.
  - This prevents malicious actors from bypassing the OTP route and directly hitting the Reset Password API endpoint.
- **Rate Limiting:**
  - "Resend OTP" requests are rate-limited using a **60-second block** in the cache to prevent abuse of the email service.