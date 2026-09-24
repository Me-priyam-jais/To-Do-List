export const userVerificationTemplateGenerator = (userName, OTP,OTPVerificationLink) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f3f4f6; padding: 40px 15px"
    >
      <tr>
        <td align="center">
          <!-- Main Card -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              max-width: 500px;
              background-color: #ffffff;
              border-radius: 16px;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="background-color: #2563eb; padding: 28px 20px"
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Verify Your Account
                </h1>

                <p style="margin: 8px 0 0; color: #dbeafe; font-size: 14px">
                  One final step to get started
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 35px 35px 30px">
                <!-- Dynamic User Name -->
                <p
                  style="
                    margin: 0 0 15px;
                    font-size: 17px;
                    line-height: 1.6;
                    font-weight: 600;
                    color: #1f2937;
                  "
                >
                  Hello ${userName},
                </p>

                <p
                  style="
                    margin: 0 0 25px;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #4b5563;
                  "
                >
                  Thank you for creating an account with us. Please use the
                  verification code below to verify your email address.
                </p>

                <!-- OTP Section -->
                <div
                  style="
                    text-align: center;
                    background-color: #eff6ff;
                    border: 1px solid #bfdbfe;
                    border-radius: 12px;
                    padding: 25px 15px;
                    margin-bottom: 25px;
                  "
                >
                  <p
                    style="
                      margin: 0 0 10px;
                      font-size: 13px;
                      color: #6b7280;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                      font-weight: 600;
                    "
                  >
                    Your Verification Code
                  </p>

                  <!-- Dynamic OTP -->
                  <code
                    style="
                      display: inline-block;
                      padding: 12px 20px;
                      background-color: #ffffff;
                      border: 1px dashed #2563eb;
                      border-radius: 8px;
                      color: #1d4ed8;
                      font-size: 30px;
                      font-weight: 700;
                      letter-spacing: 6px;
                      user-select: all;
                    "
                  >
                    ${OTP}
                  </code>

                  <p style="margin: 12px 0 0; font-size: 12px; color: #6b7280">
                    You can copy this code and paste it on the verification
                    page.
                  </p>
                </div>

                <!-- Verification Link -->
                <p
                  style="
                    margin: 0 0 15px;
                    text-align: center;
                    font-size: 14px;
                    color: #6b7280;
                  "
                >
                  Or click the button below to verify your account.
                </p>

                <div style="text-align: center; margin-bottom: 25px">
                  <a
                    href=${OTPVerificationLink}
                    style="
                      display: inline-block;
                      background-color: #2563eb;
                      color: #ffffff;
                      text-decoration: none;
                      font-size: 15px;
                      font-weight: 600;
                      padding: 13px 28px;
                      border-radius: 8px;
                    "
                  >
                    Verify My Account
                  </a>
                </div>

                <!-- Fallback Link -->
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    line-height: 1.6;
                    color: #9ca3af;
                    word-break: break-all;
                  "
                >
                  If the button doesn't work, copy and paste this link into your
                  browser:
                  <br />

                  <a
                    href="${OTPVerificationLink}"
                    style="color: #2563eb; text-decoration: none"
                  >
                    ${OTPVerificationLink}
                  </a>
                </p>

                <!-- Expiration -->
                <div
                  style="
                    margin-top: 25px;
                    padding: 12px;
                    background-color: #f9fafb;
                    border-radius: 8px;
                    text-align: center;
                  "
                >
                  <p style="margin: 0; font-size: 12px; color: #6b7280">
                    ⚠️ This verification code is valid for a limited time.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 20px;
                  border-top: 1px solid #e5e7eb;
                  background-color: #f9fafb;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    color: #9ca3af;
                    line-height: 1.6;
                  "
                >
                  If you didn't create this account, you can safely ignore this
                  email.
                </p>

                <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af">
                  © 2026 Your App. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
