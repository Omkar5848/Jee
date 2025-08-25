import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendOTP(email: string, otp: string) {
  await transporter.sendMail({
    from: `Jeevak Support <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Jeevak OTP',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  });
}
