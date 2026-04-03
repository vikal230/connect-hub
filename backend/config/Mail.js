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
