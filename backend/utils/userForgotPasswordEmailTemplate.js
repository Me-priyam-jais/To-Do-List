export const userForgotPasswordEmailTemplate = (
  userName,
  resetPasswordLink,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
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
    style="
      background-color: #f3f4f6;
      padding: 40px 15px;
    "
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
              style="
                background-color: #2563eb;
                padding: 28px 20px;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                "
              >
                Reset Your Password
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #dbeafe;
                  font-size: 14px;
                "
              >
                We're here to help you get back into your account
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 35px 30px;">

              <!-- User Name -->
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
                  margin: 0 0 20px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #4b5563;
                "
              >
                We received a request to reset the password for your
                account. Click the button below to create a new password.
              </p>

              <!-- Reset Button -->
              <div
                style="
                  text-align: center;
                  margin: 30px 0;
                "
              >
                <a
                  href="{{RESET_LINK}}"
                  style="
                    display: inline-block;
                    background-color: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                    padding: 13px 30px;
                    border-radius: 8px;
                  "
                >
                  Reset My Password
                </a>
              </div>

              <!-- Fallback Link -->
              <div
                style="
                  background-color: #f9fafb;
                  border-radius: 10px;
                  padding: 15px;
                  margin-bottom: 25px;
                "
              >
                <p
                  style="
                    margin: 0 0 8px;
                    font-size: 12px;
                    color: #6b7280;
                  "
                >
                  If the button doesn't work, copy and paste the
                  following link into your browser:
                </p>

                <a
                  href=${resetPasswordLink}
                  style="
                    color: #2563eb;
                    font-size: 12px;
                    line-height: 1.6;
                    word-break: break-all;
                    text-decoration: none;
                  "
                >
                  ${resetPasswordLink}
                </a>
              </div>

              <!-- Expiration Notice -->
              <div
                style="
                  background-color: #eff6ff;
                  border: 1px solid #bfdbfe;
                  border-radius: 10px;
                  padding: 15px;
                  margin-bottom: 25px;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #1e40af;
                  "
                >
                  🔒 For your security, this password reset link is
                  valid for a limited time and can only be used once.
                </p>
              </div>

              <!-- Security Warning -->
              <div
                style="
                  border-top: 1px solid #e5e7eb;
                  padding-top: 20px;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.7;
                    color: #6b7280;
                  "
                >
                  <strong style="color: #374151;">
                    Didn't request a password reset?
                  </strong>
                  <br />
                  You can safely ignore this email. Your password will
                  remain unchanged and no action is required.
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
                This is an automated email. Please do not reply to
                this message.
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
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
