import nodemailer from "nodemailer";
import dotenv from "dotenv/config"

export const sendMail = async (token, email) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPass
        }
    });

    const mailConfiguration = {
        from: process.env.mailUser,
        to: email,
        subject: "Verify your email",
        html: `
    <h2>Email Verification</h2>
    <p>Click the button below to verify your email</p>
    <a href="http://localhost:5173/user/verify/${token}"
       style="padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;">
       Verify Email
    </a>
  `,
    };

    transport.sendMail(mailConfiguration, function (error, info) {
        if (error) {
            console.error(error);
            console.log("Email cannot sent!");
        }
        console.log("Email send successfully!");
        console.log(info);
    })
}