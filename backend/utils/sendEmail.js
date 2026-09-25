import nodemailer from "nodemailer";

export const sendEmail = async (userEmail, subject, message) => {
  const smtpMail = process.env.SMTP_MAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (!smtpMail || !smtpPassword) {
    throw new Error(
      "SMTP credentials are missing. Add SMTP_MAIL and SMTP_PASSWORD in backend/config/config.env.",
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpMail,
      pass: smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: smtpMail,
      to: userEmail,
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.error("Failed to verify or send the Email.", {
      message: error.message,
      code: error.code,
      response: error.response,
    });
    throw error;
  }
};
