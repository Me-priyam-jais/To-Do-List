import nodemailer from "nodemailer";

export const sendEmail = async (userEmail, subject, message) => {
  
  console.log(process.env.SMTP_SERVICE,process.env.SMTP_HOST,process.env.SMTP_PORT,process.env.SMTP_MAIL,process.env.SMTP_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
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
