import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = await nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Reset Your App Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });

    console.log("email sent succesfully!");
  } catch (error) {
    console.log("email sending failed:", error);
    throw error;
  }
};


// Existing sendMail ke neeche add karo
export const sendVerifyMail = async (email, link) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome to Hype!</h2>
        <p>Click below to verify your email</p>
        <a href="${link}">Verify Email</a>
        <p>Link 24 hours mein expire ho jaega</p>
      `,
    });
    console.log("verify email sent!");
  } catch (error) {
    console.log("verify email sending failed:", error);
    throw error;
  }
};